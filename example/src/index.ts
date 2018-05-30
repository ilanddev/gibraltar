import { Iland, IlandBrowserAuthProvider } from 'iland-sdk';
import './index.css';
import { Gibraltar } from 'gibraltar';

document.addEventListener('DOMContentLoaded', async() => {
  // initialize the application
  const authProvider = new IlandBrowserAuthProvider({
    clientId: 'iland-labs'
  });
  Iland.init(authProvider);
  // draw the org
  const orgUuid = getParameterByName('org');
  if (orgUuid === null) {
    throw new Error('no org uuid specified in url, cannot load visualization.');
  }
  const gibraltar = new Gibraltar('canvas');
  return gibraltar.drawOrg(orgUuid);
});

function getParameterByName(name: string, url?: string) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
