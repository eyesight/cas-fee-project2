

// create my own emojiclass: thanks to emojione
// why: 1) i dont need all emojis (saves many 100KB), 2) dont need all the code, 3) important types where missing type
export class EmojiToUnicode {


  private static asciiList = {
  '*\\0/*': '1f646',
  '*\\O/*': '1f646',
  '-___-': '1f611',
  ':\'-)': '1f602',
  '\':-)': '1f605',
  '\':-D': '1f605',
  '>:-)': '1f606',
  '\':-(': '1f613',
  '>:-(': '1f620',
  ':\'-(': '1f622',
  'O:-)': '1f607',
  '0:-3': '1f607',
  '0:-)': '1f607',
  '0;^)': '1f607',
  'O;-)': '1f607',
  '0;-)': '1f607',
  'O:-3': '1f607',
  '-__-': '1f611',
  ':-Þ': '1f61b',
  '</3': '1f494',
  ':\')': '1f602',
  ':-D': '1f603',
  '\':)': '1f605',
  '\'=)': '1f605',
  '\':D': '1f605',
  '\'=D': '1f605',
  '>:)': '1f606',
  '>;)': '1f606',
  '>=)': '1f606',
  ';-)': '1f609',
  '*-)': '1f609',
  ';-]': '1f609',
  ';^)': '1f609',
  '\':(': '1f613',
  '\'=(': '1f613',
  ':-*': '1f618',
  ':^*': '1f618',
  '>:P': '1f61c',
  'X-P': '1f61c',
  '>:[': '1f61e',
  ':-(': '1f61e',
  ':-[': '1f61e',
  '>:(': '1f620',
  ':\'(': '1f622',
  ';-(': '1f622',
  '>.<': '1f623',
  '#-)': '1f635',
  '%-)': '1f635',
  'X-)': '1f635',
  '\\0/': '1f646',
  '\\O/': '1f646',
  '0:3': '1f607',
  '0:)': '1f607',
  'O:)': '1f607',
  'O=)': '1f607',
  'O:3': '1f607',
  'B-)': '1f60e',
  '8-)': '1f60e',
  'B-D': '1f60e',
  '8-D': '1f60e',
  '-_-': '1f611',
  '>:\\': '1f615',
  '>:/': '1f615',
  ':-/': '1f615',
  ':-.': '1f615',
  ':-P': '1f61b',
  ':Þ': '1f61b',
  ':-b': '1f61b',
  ':-O': '1f62e',
  'O_O': '1f62e',
  '>:O': '1f62e',
  ':-X': '1f636',
  ':-#': '1f636',
  ':-)': '1f642',
  '(y)': '1f44d',
  '<3': '2764',
  ':D': '1f603',
  '=D': '1f603',
  ';)': '1f609',
  '*)': '1f609',
  ';]': '1f609',
  ';D': '1f609',
  ':*': '1f618',
  '=*': '1f618',
  ':(': '1f61e',
  ':[': '1f61e',
  '=(': '1f61e',
  ':@': '1f620',
  ';(': '1f622',
  'D:': '1f628',
  ':$': '1f633',
  '=$': '1f633',
  '#)': '1f635',
  '%)': '1f635',
  'X)': '1f635',
  'B)': '1f60e',
  '8)': '1f60e',
  ':/': '1f615',
  ':\\': '1f615',
  '=/': '1f615',
  '=\\': '1f615',
  ':L': '1f615',
  '=L': '1f615',
  ':P': '1f61b',
  '=P': '1f61b',
  ':b': '1f61b',
  ':O': '1f62e',
  ':X': '1f636',
  ':#': '1f636',
  '=X': '1f636',
  '=#': '1f636',
  ':)': '1f642',
  '=]': '1f642',
  '=)': '1f642',
  ':]': '1f642'
};

 private static   asciiRegexp = '(\\*\\\\0\\/\\*|\\*\\\\O\\/\\*|\\-___\\-|\\:\'\\-\\)|\'\\:\\-\\)|\'\\:\\-D|\\>\\:\\-\\)|>\\:\\-\\)|\'\\:\\-\\(|\\>\\:\\-\\(|>\\:\\-\\(|\\:\'\\-\\(|O\\:\\-\\)|0\\:\\-3|0\\:\\-\\)|0;\\^\\)|O;\\-\\)|0;\\-\\)|O\\:\\-3|\\-__\\-|\\:\\-Þ|\\:\\-Þ|\\<\\/3|<\\/3|\\:\'\\)|\\:\\-D|\'\\:\\)|\'\\=\\)|\'\\:D|\'\\=D|\\>\\:\\)|>\\:\\)|\\>;\\)|>;\\)|\\>\\=\\)|>\\=\\)|;\\-\\)|\\*\\-\\)|;\\-\\]|;\\^\\)|\'\\:\\(|\'\\=\\(|\\:\\-\\*|\\:\\^\\*|\\>\\:P|>\\:P|X\\-P|\\>\\:\\[|>\\:\\[|\\:\\-\\(|\\:\\-\\[|\\>\\:\\(|>\\:\\(|\\:\'\\(|;\\-\\(|\\>\\.\\<|>\\.<|#\\-\\)|%\\-\\)|X\\-\\)|\\\\0\\/|\\\\O\\/|0\\:3|0\\:\\)|O\\:\\)|O\\=\\)|O\\:3|B\\-\\)|8\\-\\)|B\\-D|8\\-D|\\-_\\-|\\>\\:\\\\|>\\:\\\\|\\>\\:\\/|>\\:\\/|\\:\\-\\/|\\:\\-\\.|\\:\\-P|\\:Þ|\\:Þ|\\:\\-b|\\:\\-O|O_O|\\>\\:O|>\\:O|\\:\\-X|\\:\\-#|\\:\\-\\)|\\(y\\)|\\<3|<3|\\:D|\\=D|;\\)|\\*\\)|;\\]|;D|\\:\\*|\\=\\*|\\:\\(|\\:\\[|\\=\\(|\\:@|;\\(|D\\:|\\:\\$|\\=\\$|#\\)|%\\)|X\\)|B\\)|8\\)|\\:\\/|\\:\\\\|\\=\\/|\\=\\\\|\\:L|\\=L|\\:P|\\=P|\\:b|\\:O|\\:X|\\:#|\\=X|\\=#|\\:\\)|\\=\\]|\\=\\)|\\:\\])';

  private static regAscii = new RegExp("<object[^>]*>.*?<\/object>|<span[^>]*>.*?<\/span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|((\\s|^)"+EmojiToUnicode.asciiRegexp+"(?=\\s|$|[!,.?]))", "gi");
//private static regAsciiRisky = new RegExp("<object[^>]*>.*?<\/object>|<span[^>]*>.*?<\/span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|(()"+ns.asciiRegexp+"())", "gi");

  private tmpShortNames = [];
  private shortnames;
  private regShortNames;
  constructor() {

    // for ( let emoji in EmojiToUnicode.emojiList) {
    //   if (!EmojiToUnicode.emojiList.hasOwnProperty(emoji) || (emoji === '')) continue;
    //   this.tmpShortNames.push(emoji.replace(/[+]/g, "\\$&"));
    //   // for (let i = 0; i < EmojiToUnicode.emojiList[emoji].shortnames.length; i++) {
    //   //   this.tmpShortNames.push(EmojiToUnicode.emojiList[emoji].shortnames[i].replace(/[+]/g, "\\$&"));
    //   // }
    // }
    // this.shortnames = this.tmpShortNames.join('|');
    // this.regShortNames = new RegExp("<object[^>]*>.*?<\/object>|<span[^>]*>.*?<\/span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|("+this.shortnames+")", "gi");

  }


    public transform(str: string): string {
    // replace regular shortnames first
    let unicode;
    // fname;



      // // emojiList
      // str = str.replace(this.regShortNames, function(shortname) {
      //   if( (typeof shortname === 'undefined') || (shortname === '') || (!(shortname in EmojiToUnicode.emojiList)) ) {
      //     // if the shortname doesnt exist just return the entire matchhju
      //     console.log('1 :'+ shortname);
      //     return shortname;
      //
      //   }
      //   console.log('2:' + shortname);
      //
      //   unicode = EmojiToUnicode.emojiList[shortname].uc_output.toUpperCase();
      //   return EmojiToUnicode.convert(unicode);
      // });

    // if ascii smileys are turned on, then we'll replace them!

      const asciiRX = EmojiToUnicode.regAscii;

      str = str.replace(asciiRX, function(entire, m1, m2, m3) {
        if( (typeof m3 === 'undefined') || (m3 === '')  ) {
          // if the ascii doesnt exist just return the entire match
          return entire;
        }

       // m3 = ns.unescapeHTML(m3);
        unicode = EmojiToUnicode.asciiList[m3].toUpperCase();
        return m2 + EmojiToUnicode.convert(unicode);
      });


    return str;
  }

  // for converting unicode code points and code pairs to their respective characters
  private static convert(unicode: string): string {
    if(unicode.indexOf('-') > -1) {
      const parts = [];
      let s = unicode.split('-');
      for(let i = 0; i < s.length; i++) {
        const part = parseInt(s[i], 16);
        let partstring = '';
        if (part >= 0x10000 && part <= 0x10FFFF) {
          const hi = Math.floor((part - 0x10000) / 0x400) + 0xD800;
          const lo = ((part - 0x10000) % 0x400) + 0xDC00;
          partstring = (String.fromCharCode(hi) + String.fromCharCode(lo));
        } else {
          partstring = String.fromCharCode(part);
        }
        parts.push(partstring);
      }
      return parts.join('');
    } else {
      const s = parseInt(unicode, 16);
      if (s >= 0x10000 && s <= 0x10FFFF) {
        const hi = Math.floor((s - 0x10000) / 0x400) + 0xD800;
        const lo = ((s - 0x10000) % 0x400) + 0xDC00;
        return (String.fromCharCode(hi) + String.fromCharCode(lo));
      } else {
        return String.fromCharCode(s);
      }
    }
  }

}
