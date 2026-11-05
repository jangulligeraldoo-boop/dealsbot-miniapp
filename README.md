# Mini App DealsBot (statica, GitHub Pages)
File: index.html, style.css, app.js, defaults.js (generato: `.venv/bin/python miniapp/build_defaults.py` dopo aver cambiato i default).
Schede: Home (setup %, Autoposting/Pubblica, Panoramica, prossimo slot, piano "Gratis"), Autoposting (Amazon IT: abilita, orari Def+Lun–Dom
con aggiungi/genera/copia su tutti/svuota, tipi offerta, filtri, categorie, rotazione, venditori, produttori), Pubblica (post singolo da URL),
Esplora (Pubblica ora / Programma), Post (pubblicati, programmati, bozze), Impostazioni (generali, formati, tag, tastiera, media, tag affiliati).
- Lettura: il bot apre `URL#z=<deflate-raw base64url JSON>` con SOLO le differenze dai default + liste brevi (fallback senza liste se >6000 caratteri).
- Salvataggio: `Telegram.WebApp.sendData()` con le sole modifiche (≤4096 byte). Funziona quando la Mini App è aperta dal pulsante tastiera di `/pannello`.
  Il pulsante inline "📱 Mini-app 📱" di /start apre lo stesso pannello in sola lettura (limite di Telegram: sendData non esiste per i pulsanti inline).
- Sicurezza: il bot accetta solo `message.from.id == proprietario` e, se presente, verifica l'HMAC di `initData`. Canale bloccato rifiutato.
- Deploy: pubblica questa cartella su GitHub Pages → nel bot `/miniapp https://<utente>.github.io/<repo>/`.
- Anteprima locale: `python3 -m http.server 8765 -d miniapp` → http://localhost:8765/ (dati di esempio) oppure con un URL snapshot.
