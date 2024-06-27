export class countries {
    name: {
      common: string,
      official: string,
      nativeName: {
        srp: {
          official: string,
          common : string
        }
      }
    };
    tld : [
      engtld: string,
      localtld: string,
    ];
    cca2: string;
    ccn3: string;
    cca3 : string;
    cioc : string;
    independent : boolean;
    status : string;
     unMember: boolean;
    currencies: {
      cur: {
        name : string,
        symbol: string;
      }
    };
    capital : string;
    altSpellings:string[];
    languages: string[];
    flags: {
      png: string,
      svg: string,
      alt: string
    };
}
