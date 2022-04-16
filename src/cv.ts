import cv from './assets/AlastairM-E--2022.04.16--CV.pdf';

const container = document.getElementById('container');
const embedPDF = document.createElement('embed');

embedPDF?.setAttribute('id', 'embedPDF');
embedPDF?.setAttribute('height', '100%');
embedPDF?.setAttribute('width', '100%');
embedPDF?.setAttribute('src', cv);

container?.appendChild(embedPDF);

