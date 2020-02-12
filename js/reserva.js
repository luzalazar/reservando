var Reserva = function(horario, cantidadPersonas, precioPorPersona, codigoDescuento){
    this.horario = horario;
    this.cantidadPersonas = cantidadPersonas;
    this.precioPorPersona = precioPorPersona;
    this.codigoDescuento = codigoDescuento;
}

Reserva.prototype.calcularPrecioBase = function() {
    var precioBase = 0;
       
    if (this.codigoDescuento == 0) {
        precioBase = this.cantidadPersonas * this.precioPorPersona;    
    } else {
        var precioBaseComun = this.cantidadPersonas * this.precioPorPersona;
            precioBase = precioBaseComun - this.calcularDescuentos(this.codigoDescuento, this.cantidadPersonas, this.precioPorPersona);
    }
    return precioBase;

}

Reserva.prototype.calcularprecioFinal = function(){
    var adicionales = this.adicionalesAgregados(this.calcularPrecioBase());
    var preciobase = this.calcularPrecioBase();
    var precioFinal = preciobase + adicionales;
    return precioFinal;
}

Reserva.prototype.calcularDescuentos = function(){
    var grupales = descuentoPorGrupo(this.precioPorPersona, this.cantidadPersonas);
    var codigos = CodigosDeDescuento (this.codigoDescuento, this.cantidadPersonas, this.precioPorPersona);

    return grupales + codigos;
}

function descuentoPorGrupo (precioPorPersona, cantidadPersonas){
  
    var precioBase = cantidadPersonas * precioPorPersona;
    var descuentoPorCantidad = 0;
   
    if (cantidadPersonas >= 4 && cantidadPersonas <=6) {
        descuentoPorCantidad = (precioBase * 5) / 100;
    } else if (cantidadPersonas >= 7 && cantidadPersonas <=8){
        descuentoPorCantidad = (precioBase * 10) / 100;
    } 
    else if (cantidadPersonas >= 8){
        descuentoPorCantidad = (precioBase * 15) / 100;
    }
    return descuentoPorCantidad;
}

function CodigosDeDescuento (codigoDescuento, cantidadPersonas, precioPorPersona){
    var codigoDescuentoIngresado = 0;
    switch (codigoDescuento) {
        case "DES15":
            var precioBase = cantidadPersonas * precioPorPersona;
            codigoDescuentoIngresado = (precioBase * 15) / 100;
            break;
        
        case "DES200":
            codigoDescuentoIngresado = 200;
            break;
        
        case "DES1":
            codigoDescuentoIngresado = precioPorPersona;    
            break;
        default:
            codigoDescuentoIngresado = 0;
            break;
    }
    return codigoDescuentoIngresado;
}

Reserva.prototype.adicionalesAgregados = function(precioBase){
    var precioConFranjaHoraria = 0;
    var precioFinDeSemana = 0;
    if(this.horario.getHours()==13 || this.horario.getHours()==14 || this.horario.getHours()==20 || this.horario.getHours()==21){
        precioConFranjaHoraria = precioBase * 5 / 100;
    }
    if(this.horario.getDay()== 0 || this.horario.getDay() == 6 || this.horario.getDay()== 5 ){
        precioFinDeSemana = precioBase * 10 / 100;
    }
    return precioConFranjaHoraria + precioFinDeSemana;
     
}






