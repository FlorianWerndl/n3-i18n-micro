import { globSync } from 'glob';
import routes from './routeTranslations.json';

const pagesDir = './app/pages/';
const pagesPath = 'app/pages/';
const pages: Record<string, Record<string, string> | false> = {};

const directoryListing = globSync(`${pagesDir}**/*.vue`);

directoryListing.forEach((path) => {
  const pageIdentifier: string = path.replace(pagesPath, '').replace(/\.vue$/, '').replace(/\/index$/, '').replace(/\//g, '-').replaceAll(/\[/g, '').replaceAll(/\]/g, '');
  const partsBase: string = path.replace(pagesPath, '').replace(/\.vue$/, '').replace(/\[/g, ':').replace(/\]/g, '()');

  if (pageIdentifier !== 'index' && !pageIdentifier.startsWith('[')) {
    pages[pageIdentifier] = {};

    const parts = partsBase.split('/');
    const newParts = parts.slice();

    for (const [lang, routeTranslations] of Object.entries(routes)) {
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part && !part.match(/^\[/) && part !== 'index') {
          if (routeTranslations[part]) {
            newParts[i] = routeTranslations[part];
          }
        } else {
          newParts[i] = parts[i]; // .replace(/^_$/, '*').replace(/^_/, ':');
        }
      }
      pages[pageIdentifier][lang] = newParts.join('/');
      pages[pageIdentifier][lang] = '/' + pages[pageIdentifier][lang].replace(/\/index$/, '');
    }
  }
});
// console.log('pages :>> ', pages);

export default pages;
