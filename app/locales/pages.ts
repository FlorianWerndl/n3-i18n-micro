import { globSync } from 'glob';
import routeTranslations from './routeTranslations.json' with { type: 'json' };

function allKeysHaveSameValue(obj: { [key: string]: string }): boolean {
  const values = Object.values(obj);
  return values.every(value => value === values[0]);
}

function removeFilePathAndExtension(path: string, basePath: string): string {
  return path.replace(basePath, '').replace(/\.vue$/, '');
}

export function createPages(pagesBasePath = 'app/pages/') {
  const directoryListing = globSync(`./${pagesBasePath}**/*.vue`);
  const pages: Record<string, Record<string, string> | false> = {};

  directoryListing.forEach((path) => {
    const filename = removeFilePathAndExtension(path, pagesBasePath);
    const routeName = filename.replace(/\/index$/, '').replace(/\//g, '-').replaceAll(/\[/g, '').replaceAll(/\]/g, '').replace(/\.\.\./, '');
    let routePath = filename.replace(/\[/g, ':').replace(/\]/g, '()');

    if (routePath.match(/\.\.\./)) {
      routePath = routePath.replace(/\.\.\./, '').replace(/\(\)/, '(.*)*');
    }

    if (routeName !== 'index' && !routeName.startsWith(':')) {
      pages[routeName] = {};

      const routePathAsArray = routePath.split('/');
      const newRoutePathAsArray = [];

      for (const [lang, translations] of Object.entries(routeTranslations)) {
        for (let i = 0; i < routePathAsArray.length; i++) {
          const part = routePathAsArray[i];

          if (part && !part.match(/^:/) && part !== 'index') {
            newRoutePathAsArray[i] = translations[part as keyof typeof translations] || part;
          } else {
            newRoutePathAsArray[i] = part;
          }
        }
        pages[routeName][lang] = '/' + newRoutePathAsArray.join('/').replace(/\/index$/, '');
      }

      if (allKeysHaveSameValue(pages[routeName])) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete pages[routeName];
      }
    }
  });
  return pages;
}
