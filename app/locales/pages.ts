import { globSync } from 'glob';
import routeTranslations from './routeTranslations.json' with { type: 'json' };

function removeFilePathAndExtension(path: string, basePath: string): string {
  return path.replace(basePath, '').replace(/\.vue$/, '');
}

export function createPages(pagesBasePath = 'app/pages/') {
  const directoryListing = globSync(`./${pagesBasePath}**/*.vue`);
  const pages: Record<string, Record<string, string> | false> = {};

  directoryListing.forEach((path) => {
    const filename = removeFilePathAndExtension(path, pagesBasePath);
    const routeName = filename.replace(/\/index$/, '').replace(/\//g, '-').replaceAll(/\[/g, '').replaceAll(/\]/g, '');
    const routePath = filename.replace(/\[/g, ':').replace(/\]/g, '()');

    if (routeName !== 'index' && !routeName.startsWith(':')) {
      pages[routeName] = {};

      const routePathAsArray = routePath.split('/');
      const newRoutePathAsArray = [];

      for (const [lang, translations] of Object.entries(routeTranslations)) {
        for (let i = 0; i < routePathAsArray.length; i++) {
          const part = routePathAsArray[i];

          if (part && !part.match(/^:/) && part !== 'index') {
            const partTranslation = translations[part as keyof typeof translations];
            if (partTranslation) {
              newRoutePathAsArray[i] = partTranslation;
            } else {
              newRoutePathAsArray[i] = routePathAsArray[i];
            }
          } else {
            newRoutePathAsArray[i] = routePathAsArray[i];
          }
        }
        pages[routeName][lang] = '/' + newRoutePathAsArray.join('/').replace(/\/index$/, '');
      }
    }
  });
  return pages;
}
