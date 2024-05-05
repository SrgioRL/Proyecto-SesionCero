-- Eliminamos la base de datos si existe
DROP DATABASE IF EXISTS dungeons_and_dragons;

-- Creamos la base de datos
CREATE DATABASE dungeons_and_dragons CHARACTER SET utf8mb4;

-- Nos movemos a la base de datos recién creada
USE dungeons_and_dragons;

-- Creamos la tabla ascendencias
CREATE TABLE ascendencias (
  id_ascendencia INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT
);

-- Poblamos la tabla ascendencias
INSERT INTO ascendencias (nombre, descripcion) VALUES
('Enano', 'Resistentes y hábiles en la forja.'),
('Mediano', 'Versátiles y adaptativos.'),
('Gnomo', 'Conocedores de la magia y la ingeniería.'),
('Elfo', 'Élficos y ágiles.'),
('Humano', 'Versátiles y adaptables.'),
('Dracónido', 'Descendientes de dragones.'),
('Tiefling', 'Con sangre infernal.'),
('Semiorco', 'Una mezcla de orcos y humanos.'),
('Semielfo', 'Una mezcla de elfos y humanos.'),
('Arakocra', 'Humanoide aviario con la capacidad de volar.'),
('Aasimar', 'Ser celestial con un toque de ascendencia divina.'),
('Genasí de aire', 'Descendientes de elementales de aire, encarnando las cualidades del aire.'),
('Genasi de Tierra', 'Descendientes de elementales de tierra, encarnando las cualidades de la tierra.'),
('Genasi de Fuego', 'Descendientes de elementales de fuego, encarnando las cualidades del fuego.'),
('Genasi de Agua', 'Descendientes de elementales de agua, encarnando las cualidades del agua.'),
('Centauro', 'Humanoide con la parte inferior del cuerpo de un caballo.'),
('Bugbear', 'Goblinoides grandes y amenazantes con talento para el sigilo.'),
('Changeling', 'Cambiantes con la capacidad de cambiar de apariencia a voluntad.'),
('Gnomo de las profundidades', 'Gnomos adaptados al entorno subterráneo.'),
('Duergar', 'Enanos grises con resistencia a la magia y habilidades en la oscuridad.'),
('Eladrin', 'Ser similar a los elfos asociado con el Feywild, exhibiendo una conexión con la magia.'),
('Hada', 'Ser mágico diminuto asociado con la naturaleza y el Fey.'),
('Firbolg', 'Pariente gigante conocido por su afinidad con la naturaleza y habilidades mágicas.'),
('Githyanki', 'Raza humanoid guerreriza proveniente del Plano Astral.'),
('Githzerai', 'Raza humanoid monástica proveniente del Plano Astral.'),
('Goblin', 'Humanoides pequeños y astutos conocidos por su ingenio y sigilo.'),
('Goliat', 'Humanoides poderosos y robustos adaptados a regiones montañosas.'),
('Harengon', 'Raza humanoid nómada y ágil con características felinas.'),
(' Hobgoblin', 'Goblinoides disciplinados y militaristas con habilidad estratégica.'),
('Kenku', 'Humanoides aviarios conocidos por la imitación y talentos artísticos.'),
('Kobold', 'Humanoides reptilianos pequeños con amor por las trampas y túneles.'),
('Lizardfolk', 'Humanoides primitivos y reptilianos con habilidades naturales de supervivencia.'),
('Minotauro', 'Humanoides con cabeza de toro conocidos por su fuerza y conexiones laberínticas.'),
('Orco', 'Humanoides agresivos y poderosos con una cultura marcial.'),
('Sátiro', 'Humanoides alegres amantes de la música con características de cabra.'),
('Elfo marino', 'Elfos adaptados a entornos acuáticos con una conexión al mar.'),
('Shadar Kai', 'Humanoides sombríos con conexión al Shadowfell.'),
('Cambiaformas', 'Cambiantes con una habilidad versátil para cambiar su forma.'),
('Tabaxi', 'Humanoides con aspecto de gato conocidos por su agilidad y curiosidad.'),
('Tortuga', 'Tortugas humanoides con armadura natural y habilidades acuáticas.'),
('Tritón', 'Raza acuática humanoid con conexión a los mares.'),
('Yuan-ti', 'Humanoides serpenteantes con una mezcla de rasgos humanos y de serpiente.');

-- Creamos la tabla alineamientos
CREATE TABLE alineamientos (
  id_alineamiento INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  siglas VARCHAR(2) NOT NULL,
  descripcion TEXT
);

-- Poblamos la tabla alineamientos
INSERT INTO alineamientos (nombre, siglas, descripcion) VALUES
('Legal Bueno', 'LB', 'Hacer lo correcto según lo esperado por la sociedad. Dragones dorados, paladines y la mayoría de los enanos son de alineamiento Legal Bueno.'),
('Neutral Bueno', 'NB', 'Buscan hacer el bien sin preocuparse demasiado por las reglas o la ley. Hadas, druidas y algunos bárbaros pueden ser de alineamiento Neutral Bueno.'),
('Caótico Bueno', 'CB', 'Se inclinan hacia la bondad pero desafían la estructura y la autoridad. Elfos salvajes, bardos y algunos rebeldes son de alineamiento Caótico Bueno.'),
('Legal Neutral', 'LN', 'Siguen las leyes y las reglas, pero su sentido de la moral puede variar. Mercenarios, jueces imparciales y algunos constructos pueden tener alineamiento Legal Neutral.'),
('Neutral Neutral', 'NN', 'Buscan el equilibrio y evitan extremos. Monstruos pacíficos, ermitaños y aquellos que buscan la neutralidad están alineados como Neutral.'),
('Caótico Neutral', 'CN', 'Siguen sus propias reglas y desconfían de la autoridad. Ladrones astutos, exploradores independientes y algunos hechiceros son de alineamiento Caótico Neutral.'),
('Legal Malvado', 'LM', 'Utilizan las leyes y la autoridad para sus propios fines malévolos. Tiranos, hechiceros oscuros y algunos aristócratas malvados son de alineamiento Legal Malvado.'),
('Neutral Malvado', 'NM', 'Buscan su propio interés sin inclinarse hacia la bondad o la maldad. Asesinos a sueldo, necromantes y algunos monstruos sin escrúpulos pueden tener alineamiento Neutral Malvado.'),
('Caótico Malvado', 'CM', 'Siguen su propio camino sin restricciones morales. Demonios, brujos oscuros y algunos invocadores de caos son de alineamiento Caótico Malvado.');

-- Creamos la tabla clases
CREATE TABLE clases (
    id_clase INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    dado_golpe VARCHAR(4),
    descripcion TEXT
);

-- Poblamos la tabla clases
INSERT INTO clases (nombre, dado_golpe, descripcion) VALUES
    ('Picaro', 'd8', 'Maestro del sigilo y el engaño.'),
    ('Mago', 'd6', 'Manipulador de la magia arcana.'),
    ('Druida', 'd8', 'Guardián de la naturaleza con habilidades místicas.'),
    ('Brujo', 'd8', 'Hace pactos con seres poderosos para obtener magia.'),
    ('Hechicero', 'd6', 'Innato lanzador de hechizos.'),
    ('Explorador', 'd10', 'Maestro de la supervivencia y la exploración.'),
    ('Guerrero', 'd10', 'Experto en combate y tácticas marciales.'),
    ('Clerigo', 'd8', 'Sirviente de una deidad, dotado de poder divino.'),
    ('Paladin', 'd10', 'Caballero sagrado con habilidades divinas.'),
    ('Barbaro', 'd12', 'Feroz guerrero que entra en un frenesí.'),
    ('Monje', 'd8', 'Maestro en artes marciales y disciplinas espirituales.'),
    ('Artifice', 'd8', 'Experto en la creación de objetos mágicos y artilugios.'),
    ('Bardo', 'd8', 'Entretenedor mágico y habilidoso en muchas áreas.');

-- Creamos la tabla jugadores
CREATE TABLE IF NOT EXISTS jugadores (
    id_jugador INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido1 VARCHAR(100) NOT NULL,
	apellido2 VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(250) NOT NULL
);

-- Poblamos la tabla jugadores
INSERT INTO jugadores (nombre, apellido1, apellido2, email, contraseña) VALUES 
('Juancar', 'Menéndez', 'Sanz', 'juancar@ejemplo.com', '1234'),
('Bea', 'de Val', 'Navares', 'bea@ejemplo.com', '1234'),
('Sergio', 'Rojas', 'Lendines', 'sergio@ejemplo.com', '1234'),
('Sara', 'Ejemplo', 'Ejemplo', 'sara@ejemplo.com', '1234');

-- Creamos la tabla personajes
CREATE TABLE IF NOT EXISTS personajes(
    id_personaje INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_clase INT,
    id_ascendencia INT,
    id_alineamiento INT,
    id_jugador INT,
    nivel INT,
    CA INT,
    PG INT,
    percepcion_pasiva INT,
    iniciativa INT,
    cronica VARCHAR(1000),
    fuerza INT,
    fuerza_mod VARCHAR(2),
    destreza INT,
    destreza_mod VARCHAR(2),
    constitucion INT,
    constitucion_mod VARCHAR(2),
    inteligencia INT,
    inteligencia_mod VARCHAR(2),
    sabiduria INT,
    sabiduria_mod VARCHAR(2),
    carisma INT,
    carisma_mod VARCHAR(2),
    FOREIGN KEY (id_jugador) REFERENCES jugadores(id_jugador),
    FOREIGN KEY (id_clase) REFERENCES clases(id_clase),
    FOREIGN KEY (id_ascendencia) REFERENCES ascendencias(id_ascendencia),
    FOREIGN KEY (id_alineamiento) REFERENCES alineamientos(id_alineamiento)
);

-- Poblamos la tabla personajes
INSERT INTO personajes (nombre, id_clase, id_ascendencia, id_alineamiento, id_jugador, nivel, CA, PG, percepcion_pasiva, iniciativa, fuerza, fuerza_mod, destreza, destreza_mod, constitucion, constitucion_mod, inteligencia, inteligencia_mod, sabiduria, sabiduria_mod, carisma, carisma_mod) VALUES
('Morea Elurien', 10, 37, 3, 1, 2, 16, 22, 12, 3, 16, '+3', 14, '+2', 15, '+2', 10, '+0', 12, '+1', 8, '-1'),
('Bruna Sylma', 11, 4, 2, 2, 10, 17, 40, 14, 5, 12, '+1', 16, '+3', 14, '+2', 14, '+2', 10, '+0', 12, '+1'),
('Kylden', 7, 4, 2, 3, 10, 18, 50, 13, 6, 14, '+2', 12, '+1', 15, '+2', 10, '+0', 8, '-1', 16, '+3'),
('Sua', 1, 4, 2, 4, 10, 14, 30, 11, 2, 10, '+0', 14, '+2', 12, '+1', 16, '+3', 15, '+2', 10, '+0');

-- Creamos la tabla habilidades
CREATE TABLE habilidades (
   id_habilidad INT AUTO_INCREMENT PRIMARY KEY,
   id_personaje INT,
   atletismo VARCHAR(2),
   acrobacias VARCHAR(2),
   juego_de_manos VARCHAR(2),
   sigilo VARCHAR(2),
   arcano VARCHAR(2),
   historia VARCHAR(2),
   investigacion VARCHAR(2),
   naturaleza VARCHAR(2),
   religion VARCHAR(2),
   trato_de_animales VARCHAR(2),
   medicina VARCHAR(2),
   percepcion VARCHAR(2),
   perspicacia VARCHAR(2),
   supervivencia VARCHAR(2),
   engano VARCHAR(2),
   intimidacion VARCHAR(2),
   interpretacion VARCHAR(2),
   persuasion VARCHAR(2),
   FOREIGN KEY (id_personaje) REFERENCES personajes(id_personaje)
);

-- Poblamos la tabla habilidades
INSERT INTO habilidades (id_personaje, atletismo, acrobacias, juego_de_manos, sigilo, arcano, historia, investigacion, naturaleza, religion, trato_de_animales, medicina, percepcion, perspicacia, supervivencia, engano, intimidacion, interpretacion, persuasion) VALUES
(1, '+2', '+4', '+3', '+5', '+0', '+1', '-1', '+2', '+3', '+0', '+2', '+4', '+1', '+3', '+2', '+1', '+0', '+3'),
(2, '+3', '+5', '+2', '+4', '+1', '+2', '-1', '+0', '+3', '+0', '+1', '+5', '+2', '+4', '+1', '+2', '+3', '+3'),
(3, '+4', '+3', '+1', '+2', '+2', '+3', '-1', '+4', '+2', '+0', '+2', '+3', '+4', '+3', '+2', '+1', '+0', '+3'),
(4, '+1', '+2', '+2', '+3', '+3', '+4', '-1', '+2', '+2', '+0', '+3', '+2', '+1', '+4', '+3', '+1', '+0', '+2');

create user sesioncero identified by 'sesioncero';
grant all privileges on dungeons_and_dragons.* to sesioncero;
