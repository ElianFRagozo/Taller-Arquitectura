let registroEnEdicion = null;

        function mostrarFormulario() {
            document.getElementById('formulario').style.display = 'block';
            document.getElementById('listaRegistros').style.display = 'none';
        }

        function mostrarRegistros() {
            document.getElementById('formulario').style.display = 'none';
            document.getElementById('listaRegistros').style.display = 'block';
            actualizarListaRegistros();
        }

        function eliminarTodosRegistros() {
            if (confirm('¿Estás seguro de que quieres eliminar todos los registros?')) {
                localStorage.removeItem('registros');
                actualizarListaRegistros();
                alert('Todos los registros han sido eliminados.');
            }
        }

        function actualizarListaRegistros() {
            const registros = JSON.parse(localStorage.getItem('registros')) || [];
            const listaRegistros = document.getElementById('registros');
            listaRegistros.innerHTML = '';

            registros.forEach((registro, index) => {
                const registroDiv = document.createElement('div');
                registroDiv.className = 'registro';
                registroDiv.innerHTML = `
                    <p><strong>Nombre:</strong> ${registro.nombre}</p>
                    <p><strong>Teléfono:</strong> ${registro.telefono}</p>
                    <p><strong>Sexo:</strong> ${registro.sexo}</p>
                    <p><strong>País:</strong> ${registro.pais}</p>
                    <p><strong>Departamento:</strong> ${registro.departamento}</p>
                    <p><strong>Ciudad:</strong> ${registro.ciudad}</p>
                    <p><strong>Temperatura:</strong> ${registro.temperatura}</p>
                    <p><strong>Fecha de Nacimiento:</strong> ${registro.fechaNacimiento}</p>
                    <button onclick="editarRegistro(${index})">Editar</button>
                    <button onclick="eliminarRegistro(${index})">Eliminar</button>
                `;
                listaRegistros.appendChild(registroDiv);
            });
        }

        function editarRegistro(index) {
            const registros = JSON.parse(localStorage.getItem('registros')) || [];
            registroEnEdicion = index;
            const registro = registros[index];

            document.getElementById('nombre').value = registro.nombre;
            document.getElementById('telefono').value = registro.telefono;
            document.getElementById('sexo').value = registro.sexo;
            document.getElementById('pais').value = registro.pais;
            document.getElementById('departamento').value = registro.departamento;
            document.getElementById('ciudad').value = registro.ciudad;
            document.getElementById('temperatura').value = registro.temperatura;
            document.getElementById('fechaNacimiento').value = registro.fechaNacimiento;

            mostrarFormulario();
        }

        function eliminarRegistro(index) {
            if (confirm('¿Estás seguro de que quieres eliminar este registro?')) {
                const registros = JSON.parse(localStorage.getItem('registros')) || [];
                registros.splice(index, 1);
                localStorage.setItem('registros', JSON.stringify(registros));
                actualizarListaRegistros();
            }
        }

        document.getElementById('registroForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const registro = {
                nombre: document.getElementById('nombre').value,
                telefono: document.getElementById('telefono').value,
                sexo: document.getElementById('sexo').value,
                pais: document.getElementById('pais').value,
                departamento: document.getElementById('departamento').value,
                ciudad: document.getElementById('ciudad').value,
                temperatura: document.getElementById('temperatura').value,
                fechaNacimiento: document.getElementById('fechaNacimiento').value
            };

            let registros = JSON.parse(localStorage.getItem('registros')) || [];

            if (registroEnEdicion !== null) {
                registros[registroEnEdicion] = registro;
                registroEnEdicion = null;
            } else {
                registros.push(registro);
            }

            localStorage.setItem('registros', JSON.stringify(registros));

            alert('Registro guardado con éxito.');
            this.reset();
            mostrarRegistros();
        });

        // Mostrar registros al cargar la página
        window.onload = mostrarRegistros;