use db_helping_join;
INSERT INTO voluntario(nombre, edad, email, direccion, imagen, contrasena) VALUES
('María García Pérez', '1995-06-12', 'mariagarcia@gmail.com', 'Av. Chapultepec 256, Col. Roma, CDMX', 'https://imgur.com/2567', '123456'),
('Pedro Hernández Flores', '1988-04-03', 'pedrohflores@hotmail.com', 'Av. San Marcelino Champagnat 850, Fracc. Las Palmas, 22440 Tijuana, B.C.', 'https://imgur.com/3849', 'contraseña123'),
('Luisa Martínez Torres', '2000-10-20', 'lmartinez@outlook.com', 'Paseo de la Reforma #100, Col. Juárez, CDMX', 'https://imgur.com/6295', 'claveSegura'),
('José Ramírez Sánchez', '1975-02-28', 'joseramirez@yahoo.com', 'Calz Independencia Sur 324-B, Zona Centro, 44100 Guadalajara, Jal.', 'https://imgur.com/8309', 'admin123'),
('Ana Flores Jiménez', '1992-08-15', 'anafloresj@gmail.com', 'Calle López Mateos #32, Col. Del Valle, Monterrey', 'https://imgur.com/4376', 'miclave123'),
('Juan García González', '1980-12-01', 'juangarcia@hotmail.com', 'Casa 2, Av Porfirio Díaz 152, Extremadura Insurgentes, Benito Juárez, 03740 Ciudad de México, CDMX', 'https://imgur.com/5843', 'contraseña321'),
('Mónica Torres Díaz', '1998-07-25', 'mtorresdiaz@gmail.com', 'Calle 15 Ote. 13, El Carmen, 72530 Puebla, Pue.', 'https://imgur.com/7294', 'miclave456'),
('Roberto Hernández Castro', '1970-05-08', 'rhernandezcastro@yahoo.com', 'Calle Reforma #78, Col. Centro, Oaxaca', 'https://imgur.com/2948', 'admin456'),
('Fernanda Ramírez López', '1996-03-17', 'fernandarl@outlook.com', 'Av. Universidad #120, Col. Narvarte, CDMX', 'https://imgur.com/1865', 'clave1234'),
('Diego Sánchez González', '1985-09-23', 'diegosanchezg@gmail.com', 'Calle 5 de Mayo #90, Col. Centro, Toluca', 'https://imgur.com/5314', 'mipassword');
select * from voluntario;

insert into categoria(nombre) values ('Niños y adolescentes'), ('Personas mayores'), ('Vivienda'), ('Comedores'), ('Educación'), ('Adicciones'), ('Enfermedades'), ('Personas con discapacidad'), ('Indigencia'),
('Reinserción social'), ('Medio ambiente'), ('Animales'),('Administración'), ('Comunicación'), ('Derecho'), ('Diseño'), ('Psicología y Psicometría'), ('Tecnología');
select * from categoria;

-- CATEGORIAS SELECCIONADAS POR EL VOLUNTARIO
insert into voluntario_categoria(id_voluntario, id_categoria) values ('1', '2');
insert into voluntario_categoria(id_voluntario, id_categoria) values ('1', '3');
insert into voluntario_categoria(id_voluntario, id_categoria) values ('1', '8');
insert into voluntario_categoria(id_voluntario, id_categoria) values ('1', '10');
insert into voluntario_categoria(id_voluntario, id_categoria) values ('1', '13');
insert into voluntario_categoria(id_voluntario, id_categoria) values ('1', '18');

-- DATOS DE LOS BENEFICIADOS
INSERT INTO beneficiado (nombre, imagen, tipo, direccion, telefono, descripcion, responsable, email, contrasena, evento_eliminados)
VALUES
    ('Fundación Alas de Esperanza', 'https://example.com/alas_de_esperanza.jpg', 'organizacion', 'Av. Revolución 200, Ciudad de México', '5551234567', 'Somos una organización sin fines de lucro que trabaja para mejorar la calidad de vida de niños y niñas con discapacidades. Ofrecemos servicios de terapia física, ocupacional y de lenguaje, así como apoyo psicológico y asesoría para las familias.', 'María Torres', 'contacto@alasdeesperanza.org.mx', 'alas2023', 0),
    ('Asociación Unidos por México', 'https://example.com/unidos_por_mexico.jpg', 'civil', 'Calle 5 de Mayo 100, Guadalajara', '3334567890', 'Nos dedicamos a apoyar a las comunidades más necesitadas de México, brindando servicios de salud, educación y asistencia social. Contamos con programas de alimentación, becas escolares y atención médica gratuita.', 'Juan García', 'contacto@unidosmx.org', 'unidos2023', 0),
    ('Cruz Roja Mexicana', 'https://example.com/cruz_roja.jpg', 'organizacion', 'Av. Paseo de la Reforma 100, Ciudad de México', '5557890123', 'La Cruz Roja es una organización humanitaria que brinda servicios de emergencia y atención médica en todo México. Nuestros voluntarios trabajan incansablemente para salvar vidas y aliviar el sufrimiento en situaciones de crisis.', 'Pedro Martínez', 'contacto@cruzroja.org.mx', 'cruzroja2023', 0),
    ('Fundación Siempre Contigo', 'https://example.com/siempre_contigo.jpg', 'civil', 'Av. Insurgentes Sur 500, Ciudad de México', '5552345678', 'Ayudamos a personas con enfermedades crónicas y a sus familias a sobrellevar los retos que enfrentan día a día. Ofrecemos servicios de asesoría legal, asistencia alimentaria y apoyo emocional.', 'Ana Torres', 'contacto@siemprecontigo.org.mx', 'siempre2023', 0),
    ('Instituto Mexicano de la Juventud', 'https://example.com/imjuve.jpg', 'organizacion', 'Av. Universidad 1200, Ciudad de México', '5553456789', 'Nos enfocamos en apoyar y fortalecer el desarrollo de los jóvenes mexicanos, fomentando su participación activa en la sociedad y promoviendo la cultura emprendedora. Ofrecemos programas de capacitación, becas y apoyo para la creación de empresas.', 'Luisa Hernández', 'contacto@imjuve.gob.mx', 'imjuve2023', 0),
    ('Fundación Ayuda en Acción', 'https://example.com/ayuda_en_accion.jpg', 'civil', 'Calle 20 de Noviembre 300, Monterrey', '8112345678', 'Trabajamos en proyectos', 'Joel Arozarena', 'fundacionAyudaAccion@gmail.com', '12feff33','0');
select * from beneficiado;

-- Categorias seleccioandas por los beneficiados
insert into beneficiado_categoria(id_beneficiado, id_categoria) values('1', '1');
insert into beneficiado_categoria(id_beneficiado, id_categoria) values('1', '8');
insert into beneficiado_categoria(id_beneficiado, id_categoria) values('1', '17');
insert into beneficiado_categoria(id_beneficiado, id_categoria) values('2', '7');
insert into beneficiado_categoria(id_beneficiado, id_categoria) values('2', '4');
insert into beneficiado_categoria(id_beneficiado, id_categoria) values('2', '5');
insert into beneficiado_categoria(id_beneficiado, id_categoria) values('3', '7');
insert into beneficiado_categoria(id_beneficiado, id_categoria) values('4', '4');
insert into beneficiado_categoria(id_beneficiado, id_categoria) values('4', '15');
insert into beneficiado_categoria(id_beneficiado, id_categoria) values('5', '5');
insert into beneficiado_categoria(id_beneficiado, id_categoria) values('6', '13');

-- Creacion de eventos
INSERT INTO evento (id_beneficiado, nombre, descripcion, fecha_inicio, fecha_fin, direccion, imagen)
VALUES (1, 'Feria benéfica de la Primavera', 'Feria con juegos, atracciones y conciertos, todos los fondos recaudados serán donados a una fundación de caridad local', '2023-04-20 10:00:00', '2023-04-25 22:00:00', 'Av. Juárez 123, Chapultepec, 72365 Puebla, Pue.', 'https://example.com/feria.jpg');

INSERT INTO evento (id_beneficiado, nombre, descripcion, fecha_inicio, fecha_fin, direccion, imagen)
VALUES (2, 'Festival Internacional de Cine con fines benéficos', 'Proyección de películas de todo el mundo, con los ingresos destinados a apoyar una organización benéfica que ayuda a niños con cáncer', '2023-05-10 16:00:00', '2023-05-16 23:00:00', 'Av. México 456, San Jerónimo Aculco, La Magdalena Contreras, 10400 Ciudad de México, CDMX', 'https://example.com/cine.jpg');

INSERT INTO evento (id_beneficiado, nombre, descripcion, fecha_inicio, fecha_fin, direccion, imagen)
VALUES (1, 'Fiesta de la Vendimia benéfica', 'Celebración de la cosecha de uva con degustaciones, con los ingresos destinados a apoyar a una organización benéfica local que ayuda a personas mayores necesitadas', '2023-08-12 12:00:00', '2023-08-13 22:00:00', 'C. Morelos 660, Centro Historico, 78000 San Luis, S.L.P.', 'https://example.com/vendimia.jpg');

INSERT INTO evento (id_beneficiado, nombre, descripcion, fecha_inicio, fecha_fin, direccion, imagen)
VALUES (4, 'Maratón Ciudad de México para la caridad', 'Carrera de 42 km por las calles de la capital, con los ingresos destinados a apoyar a una fundación local que ayuda a personas con discapacidades intelectuales', '2023-08-22 07:00:00', '2023-08-22 13:00:00', 'Av. Paseo de la Reforma #222, Ciudad de México, Ciudad de México', 'https://example.com/maraton.jpg');

-- Creacion de evento-categoria

insert into evento_categoria(id_evento, id_categoria) values ('1','1');
insert into evento_categoria(id_evento, id_categoria) values ('2','2');
insert into evento_categoria(id_evento, id_categoria) values ('3','3');
insert into evento_categoria(id_evento, id_categoria) values ('4','4');

-- Creacion de reporte
 
 insert into reporte(id_evento,id_voluntario,descripcion,fecha,estatus) values('1','1', 'Nunca hubo concierto y juegos, de tal forma que el evento no se llevó a cabo como mencionan', '2023-04-21 11:05:02', 'pendiente');
 
 -- Creación de evento-voluntario
 
 insert into evento_voluntario(id_evento, id_voluntario) values('2','3');
 insert into evento_voluntario(id_evento, id_voluntario) values('1','7');
 
