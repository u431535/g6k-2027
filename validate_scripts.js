const fs = require('fs');

const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

['index.html', 'en/index.html'].forEach(file => {
  const html = fs.readFileSync(file, 'utf8');
  const startTag = '<script type="module">';
  const endTag = '</script>';
  const startIdx = html.indexOf(startTag);
  if (startIdx === -1) {
    console.error('No module script found in ' + file);
    return;
  }
  const codeStart = startIdx + startTag.length;
  const codeEnd = html.indexOf(endTag, codeStart);
  let code = html.substring(codeStart, codeEnd);
  
  code = code.replace(/import\s+[^;]+;/g, '// import');
  
  try {
    new AsyncFunction(code);
    console.log(file + ': Module script syntax is 100% VALID!');
  } catch (err) {
    console.error(file + ': Syntax error:', err);
  }
});
