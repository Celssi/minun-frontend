import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'gtag', src: 'https://www.googletagmanager.com/gtag/js?id=G-GEPNC6YNVY' },
  { name: 'datalayer', src: '../../assets/datalayer.js' }
];

declare var document: any;

@Injectable()
export class DynamicScriptLoaderService {
  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]): Promise<any> {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;

        script.onload = () => {
          this.scripts[name].loaded = true;
          resolve({ script: name, loaded: true, status: 'Loaded' });
        };

        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }
}
