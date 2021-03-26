import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MapDistanceService } from './service/map-distance.service';

declare var google;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    options: any;

    math = Math;

    overlays: any[];

    dialogVisible: boolean;

    markerTitle: string;

    selectedPosition: any;

    infoWindow: any;

    draggable: boolean;
    pos: any;
    dis: any;

    constructor(private messageService: MessageService, private mapDistanceService: MapDistanceService) { }

    ngOnInit() {
        this.pos = [
            { lat: 36.879466, lng: 30.667648, title: "A" },
            { lat: 36.883707, lng: 30.689216, title: "B" },
            { lat: 36.885233, lng: 30.702323, title: "C" }
        ]
        this.options = {
            center: { lat: 36.890257, lng: 30.707417 },
            zoom: 12
        };

        navigator.geolocation.getCurrentPosition((position) => {
            this.pos.push({ lat: position.coords.latitude, lng: position.coords.longitude, title: "requData" });
            this.initOverlays();
            this.polyline(this.pos);
            this.dis = [];
            for (let i = 1; i < this.pos.length; i++) {
                let pos = i - 1 + ' to ' + i;
                console.log(pos)
                this.dis.push({
                    posBetweenStop: pos,
                    dis: this.conversionData(this.pos.slice(i - 1, i + 1))
                })
            }
            console.log(this.dis)
        });
        this.infoWindow = new google.maps.InfoWindow();
    }

    polyline(location) {
        let map = [];
        let markers = [];
        let coords = [];

        // Adds a marker to the map and push to the array.
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });

        //push to array
        markers.push(marker);
        coords.push(location);
        var line = new google.maps.Polyline({
            path: coords,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        line.setMap(map);
    }



    handleMapClick(event) {
        this.dialogVisible = true;
        this.selectedPosition = event.latLng;
    }

    handleOverlayClick(event) {
        let isMarker = event.overlay.getTitle != undefined;

        if (isMarker) {
            let title = event.overlay.getTitle();
            this.infoWindow.setContent('' + title + '');
            this.infoWindow.open(event.map, event.overlay);
            event.map.setCenter(event.overlay.getPosition());

            this.messageService.add({ severity: 'info', summary: 'Marker Selected', detail: title });
        }
        else {
            this.messageService.add({ severity: 'info', summary: 'Shape Selected', detail: '' });
        }
    }

    addMarker() {
        this.overlays.push(new google.maps.Marker({ position: { lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng() }, title: this.markerTitle, draggable: this.draggable }));
        this.markerTitle = null;
        this.dialogVisible = false;
    }

    handleDragEnd(event) {
        this.messageService.add({ severity: 'info', summary: 'Marker Dragged', detail: event.overlay.getTitle() });
    }

    initOverlays() {
        if (!this.overlays || !this.overlays.length) {
            let reqData = [];
            this.pos.map(data => {
                reqData.push(new google.maps.Marker({ position: { lat: data.lat, lng: data.lng }, title: "Ataturk Park" }))
            });
            reqData.push(new google.maps.Polyline({
                path: this.pos,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
                icons: [{
                    icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
                    offset: '100%',
                    repeat: '20px'
                }]
            }))
            this.overlays = reqData;
        }
    }

    zoomIn(map) {
        map.setZoom(map.getZoom() + 1);
    }

    zoomOut(map) {
        map.setZoom(map.getZoom() - 1);
    }

    clear() {
        this.overlays = [];
    }

    conversionData(pos = []) {
        if (pos.length == 2) {
            var p1 = new google.maps.LatLng(pos[0].lat, pos[0].lng);
            var p2 = new google.maps.LatLng(pos[1].lat, pos[1].lng);
            let reqData = this.calcDistance(p1, p2);
            console.log("ditance" + reqData)
            return reqData;
        }
    }
    calcDistance(p1, p2) {
        return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
    }

}

