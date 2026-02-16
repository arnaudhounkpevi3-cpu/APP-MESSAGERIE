document.getElementById('emailForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const to = document.getElementById('to').value;
    const subject = document.getElementById('subject').value;
    const text = document.getElementById('message').value;
    const status = document.getElementById('status');

    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to, subject, text })
        });

        const data = await response.json();
        
        if (data.success) {
            status.className = 'success';
            status.textContent = '✓ Email envoyé avec succès !';
            document.getElementById('emailForm').reset();
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        status.className = 'error';
        status.textContent = '✗ Erreur : ' + error.message;
    }
});