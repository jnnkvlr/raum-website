document.addEventListener('DOMContentLoaded', function() {
    // München Koordinaten
    const muenchenCoords = [48.137154, 11.576124];
    
    // Karte initialisieren
    const map = L.map('map').setView(muenchenCoords, 13);
  
    // OpenStreetMap Tile Layer (mit Schwarz-Weiß-Filter)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
      className: 'bw-map'
    }).addTo(map);
  
    // Schwarz-Weiß-Filter auf die Karte anwenden
    document.styleSheets[0].insertRule('.bw-map { filter: grayscale(100%); }', 0);
  
    // Orte mit den Stationsnamen
    const locations = [
      {
        name: "Meditationsstation",
        coordinates: [48.1373, 11.5754],
        description: "Ein ruhiger Ort für Achtsamkeit und innere Einkehr, umgeben von der urbanen Landschaft Münchens.",
        markerClass: "marker-1"
      },
      {
        name: "Spielestation",
        coordinates: [48.1642, 11.6056],
        description: "Interaktive Spielfläche für kreatives Miteinander und spielerisches Lernen im Englischen Garten.",
        markerClass: "marker-2"
      },
      {
        name: "Sportstation",
        coordinates: [48.1467, 11.5708],
        description: "Moderne Trainingsgeräte und offene Flächen für verschiedene Sportaktivitäten und Bewegungsformen.",
        markerClass: "marker-3"
      },
      {
        name: "Kunststation",
        coordinates: [48.1731, 11.5462],
        description: "Kreativbereich für künstlerischen Ausdruck und Inspiration mit Blick auf die Stadtkulisse.",
        markerClass: "marker-4"
      },
      {
        name: "Lernstation",
        coordinates: [48.1298, 11.5832],
        description: "Ruhiger Ort zum Lernen, Lesen und für Wissensaustausch in entspannter Atmosphäre.",
        markerClass: "marker-5"
      }
    ];
  
    // Variable zum Speichern der aktuell ausgewählten Koordinaten
    let currentCoordinates = null;
  
    // Benutzerdefinierte Marker erstellen
    locations.forEach(location => {
      // Benutzerdefiniertes Icon für jeden Marker
      const customIcon = L.divIcon({
        className: `custom-marker ${location.markerClass}`,
        iconSize: [35, 35],
        iconAnchor: [15, 15]
      });
      
      // Marker mit benutzerdefinierten Icons erstellen
      const marker = L.marker(location.coordinates, {
        icon: customIcon
      }).addTo(map);
      
      // Popup-Funktion beim Klick
      marker.on('click', function() {
        document.getElementById('popup-title').textContent = location.name;
        document.getElementById('popup-description').textContent = location.description;
        document.getElementById('popup').classList.remove('hidden');
        
        // Speichere die aktuellen Koordinaten für die Navigation
        currentCoordinates = location.coordinates;
      });
    });
  
    // Navigation starten
    document.getElementById('popup-navigate').addEventListener('click', function() {
      if (currentCoordinates) {
        const [lat, lng] = currentCoordinates;
        
        // Prüfen, ob das Gerät mobil ist und Geolocation unterstützt
        if (navigator.geolocation && isMobileDevice()) {
          // Google Maps Navigation öffnen
          window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`, '_blank');
        } else {
          // Für Desktop oder falls Geolocation nicht unterstützt wird
          window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
        }
      }
    });
  
    // Popup schließen
    document.getElementById('popup-close').addEventListener('click', function() {
      document.getElementById('popup').classList.add('hidden');
      currentCoordinates = null;
    });
    
    // Hilfsfunktion zur Erkennung mobiler Geräte
    function isMobileDevice() {
      return (typeof window.orientation !== 'undefined') || 
             (navigator.userAgent.indexOf('IEMobile') !== -1) ||
             (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i));
    }
  });