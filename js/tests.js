var expect = chai.expect;

describe('Testeá la función reservarHorario', function () {
    describe('Cuando se realiza una reserva', function () {
        it('se debe eliminar el horario del arreglo', function () {
            var nuevoRestaurant = new Restaurant(22, "Byron Hoxton", "Hamburguesa", "Londres", ["14:00", "16:00", "21:30"], "../img/hamburguesa3.jpg", [4, 9, 10, 10, 6]);
            nuevoRestaurant.reservarHorario("14:00");
            expect(nuevoRestaurant.horarios).to.not.include("14:00");
        })

        it('si el restaurant no posee el horario, el arreglo se mantiene igual', function () {
        var nuevoRestaurant = new Restaurant(22, "Byron Hoxton", "Hamburguesa", "Londres", ["14:00", "16:00", "21:30"], "../img/hamburguesa3.jpg", [4, 9, 10, 10, 6]);
        var horariosAntesDeReserva = nuevoRestaurant.horarios;
        nuevoRestaurant.reservarHorario('20:00');
        expect(horariosAntesDeReserva).to.eql(["14:00", "16:00", "21:30"]);
    })
       it('pero no se le pasa ningún parámetro el arreglo se mantiene igual', function () {
        var nuevoRestaurant = new Restaurant(22, "Byron Hoxton", "Hamburguesa", "Londres", ["14:00", "16:00", "21:30"], "../img/hamburguesa3.jpg", [4, 9, 10, 10, 6]);
        var horariosAntesDeReserva = nuevoRestaurant.horarios;
        nuevoRestaurant.reservarHorario(' ');
        expect(horariosAntesDeReserva).to.eql(["14:00", "16:00", "21:30"]);
    })
    })
})

describe('Testeá la función obtenerPuntuación', function () {
    describe('Dado un restaurant con determinadas calificaciones,', function () {
        it('la puntuación se calcula correctamente', function () {
            var nuevoRestaurant = new Restaurant(22, "Byron Hoxton", "Hamburguesa", "Londres", ["14:00", "16:00", "21:30"], "../img/hamburguesa3.jpg", [4, 6, 7, 8, 9, 2]);
            var promedio = nuevoRestaurant.obtenerPuntuacion();
            expect(promedio).to.eql(6);
        })
        it('un restaurant con ninguna calificación, tiene como puntuación 0', function () {
        var nuevoRestaurant = new Restaurant(22, "Byron Hoxton", "Hamburguesa", "Londres", ["14:00", "16:00", "21:30"], "../img/hamburguesa3.jpg", []);
        var calificacionesOriginales = nuevoRestaurant.calificaciones;
        expect(calificacionesOriginales).to.eql([]);
    })
    })
})


describe('Testeá la función calificar', function () {
    it('si califico con una puntuación igual a 0, el arreglo se mantiene igual', function () {
        var nuevoRestaurant = new Restaurant(22, "Byron Hoxton", "Hamburguesa", "Londres", ["14:00", "16:00", "21:30"], "../img/hamburguesa3.jpg", [4, 9, 10, 10, 6]);
        var calificacionesOriginales = nuevoRestaurant.calificaciones;
        nuevoRestaurant.calificar([0, 0, 0, 0, 0]);
        expect(calificacionesOriginales).to.eql(calificacionesOriginales);
    })
})

describe('Testeá la función buscarRestaurante(id)', function () {
    it('si busco un restaurant que no existe, el listado no se modifica', function () {
        var listadoOriginal = listado.listadoDeRestaurantes;
        listado.buscarRestaurante(25);
        var listadoDespuesDeBusqueda = listado.listadoDeRestaurantes;
        expect(listadoDespuesDeBusqueda).to.eql(listadoOriginal);
    })
})

describe('Testeá la función obtenerRestaurantes', function () {
    it('al ingresar un filtro con item inexistente no se retorna resultado', function () {
        listado.obtenerRestaurantes("Hamburguesa", "Buenos Aires", ["12:00", "20:00", "15:00"]);
        expect(listado.obtenerRestaurantes()).to.be.an("array").that.does.not.include("Hamburguesa", "Buenos Aires", ["12:00", "20:00", "15:00"])
    })
})

//Test de la funcionalidad Reserva

describe('Testeo TDD, nueva funcionalidad Reserva', function () {
    it('El calculo del precio base de una reserva se debe realizar correctamente', function () {
        var reservaPrincipal = new Reserva(new Date(2019, 11, 14, 19, 00), 2, 100, "");
        expect(reservaPrincipal.calcularPrecioBase()).to.equal(200);
    })
    it('El descuento DES1 se realiza correctamente', function () {
        var reservaPrincipal = new Reserva(new Date(2019, 11, 18, 19, 00), 2, 200, "DES1");
        expect(reservaPrincipal.calcularPrecioBase()).to.equal(200);
    })
})


describe('Calculo precio final de una reserva', function () {
    it('El precio final de la reserva se calcula de manera correcta si es en día de fin de semana, en horario concurrido y con un código de descuento', function () {
        var reservaPrincipal = new Reserva(new Date(2019, 11, 14, 13, 00), 2, 200, "DES200");
        expect(reservaPrincipal.calcularprecioFinal()).to.equal(230);
    })

    it('Si es para un grupo de 8 personas o más el cálculo es correcto', function(){
        var reservaPrincipal = new Reserva(new Date(2019, 11, 19, 22, 00), 9, 100);
        expect(reservaPrincipal.calcularprecioFinal()).to.equal(765);  
    })

    it('Si un grupo de entre 4 y 6 personas realiza una reserva y tiene un código DES15, el precio final es correcto', function(){
        var reservaPrincipal = new Reserva(new Date(2019, 11, 20, 22, 30), 5, 200, "DES15");
        expect(reservaPrincipal.calcularprecioFinal()).to.equal(880);
    })

})

