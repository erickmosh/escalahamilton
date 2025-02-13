// script.js
document.getElementById('submit-btn').addEventListener('click', function () {
    const form = document.getElementById('hamilton-test');
    const formData = new FormData(form);
  
    // Obtener el nombre del usuario
    const userName = document.getElementById('user-name').value.trim();
    if (!userName) {
      alert('Por favor, introduce tu nombre.');
      return;
    }
  
    let score = 0;
    let answers = [];
    let allQuestionsAnswered = true;
  
    // Validar que todas las preguntas estén respondidas
    for (let i = 1; i <= 14; i++) {
      const answer = formData.get(`q${i}`);
      if (!answer) {
        allQuestionsAnswered = false;
        break;
      }
      score += parseInt(answer);
      answers.push(`Pregunta ${i}: ${answer}`);
    }
  
    if (!allQuestionsAnswered) {
      alert('Por favor, responde todas las preguntas.');
      return;
    }
  
    // Obtener la fecha y hora actual
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  
    // Generar PDF con jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    // Título del PDF
    doc.text('Resultados del Test de Ansiedad de Hamilton', 10, 10);
    doc.text(`Nombre: ${userName}`, 10, 20);
    doc.text(`Fecha y Hora: ${formattedDate}`, 10, 30);
    doc.text(`Puntuación total: ${score}`, 10, 40);
  
    // Agregar respuestas al PDF
    let yOffset = 50;
    answers.forEach((answer) => {
      doc.text(answer, 10, yOffset);
      yOffset += 10;
    });
  
    // Guardar el PDF como un archivo temporal
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
  
    // Crear botones para descargar y enviar por correo
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Descargar PDF';
    downloadButton.style.marginTop = '20px';
  
    const emailButton = document.createElement('button');
    emailButton.textContent = 'Enviar por Correo Electrónico';
    emailButton.style.marginTop = '10px';
  
    // Añadir botones al DOM
    const container = document.querySelector('.container');
    container.appendChild(downloadButton);
    container.appendChild(emailButton);
  
    // Funcionalidad del botón Descargar
    downloadButton.addEventListener('click', () => {
      const downloadLink = document.createElement('a');
      downloadLink.href = pdfUrl;
      downloadLink.download = 'resultados-hamilton-test.pdf';
      downloadLink.click();
    });
  
    // Funcionalidad del botón Enviar por Correo
    emailButton.addEventListener('click', () => {
      const emailSubject = encodeURIComponent('Resultados del Test de Ansiedad de Hamilton');
      const emailBody = encodeURIComponent(
        `Hola,\n\nAdjunto encontrarás los resultados del Test de Ansiedad de Hamilton.\n\nNombre: ${userName}\nFecha y Hora: ${formattedDate}\nPuntuación total: ${score}\n\nEl archivo PDF está adjunto.`
      );
  
      const mailtoLink = `mailto:semiramismedina@gmail.com?subject=${emailSubject}&body=${emailBody}`;
      window.location.href = mailtoLink;
  
      // Nota: El usuario debe adjuntar manualmente el archivo PDF descargado.
      alert('Se abrirá tu cliente de correo. Adjunta el archivo PDF descargado manualmente.');
    });

});
