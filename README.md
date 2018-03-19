# node-pdf
A node.js pdf reader with 2 styles (Based64 re-render and iframe raw loading).

Include a csv reader for urls.

Powered by pdf.js and pdfobject.js

# Getting started 

#### Install dependencies:
> cd node-pdf && npm install

#### On MacOS or Linux, run the app with this command:
> $ DEBUG=node-pdf:* npm start
  
#### On Windows, use this command:
> SET DEBUG=node-pdf:* & npm start


# Test

> /api/v1/pdf?style=< 1, 2 > & url=< url >

> i.e. 
  http://localhost:3000/api/v1/pdf?style=1&url=https://aad.archives.gov/aad/createpdf?rid=85181%26dt=2082%26dl=1345