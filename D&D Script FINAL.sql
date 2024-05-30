-- Crear la base de datos
DROP DATABASE IF EXISTS dungeons_and_dragons;
CREATE DATABASE dungeons_and_dragons;
USE dungeons_and_dragons;

-- Crear la tabla jugadores
CREATE TABLE `jugadores` (
  `id_jugador` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido1` varchar(100) NOT NULL,
  `apellido2` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`id_jugador`),
  UNIQUE KEY `email` (`email`)
) ;

-- Crear la tabla alineamientos
CREATE TABLE `alineamientos` (
  `id_alineamiento` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `siglas` varchar(2) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id_alineamiento`)
) ;

-- Insertar datos en la tabla alineamientos
INSERT INTO `alineamientos` VALUES 
(1,'Legal Bueno','LB','Hacer lo correcto según lo esperado por la sociedad. Dragones dorados, paladines y la mayoría de los enanos son de alineamiento Legal Bueno.'),
(2,'Neutral Bueno','NB','Buscan hacer el bien sin preocuparse demasiado por las reglas o la ley. Hadas, druidas y algunos bárbaros pueden ser de alineamiento Neutral Bueno.'),
(3,'Caótico Bueno','CB','Se inclinan hacia la bondad pero desafían la estructura y la autoridad. Elfos salvajes, bardos y algunos rebeldes son de alineamiento Caótico Bueno.'),
(4,'Legal Neutral','LN','Siguen las leyes y las reglas, pero su sentido de la moral puede variar. Mercenarios, jueces imparciales y algunos constructos pueden tener alineamiento Legal Neutral.'),
(5,'Neutral Neutral','NN','Buscan el equilibrio y evitan extremos. Monstruos pacíficos, ermitaños y aquellos que buscan la neutralidad están alineados como Neutral.'),
(6,'Caótico Neutral','CN','Siguen sus propias reglas y desconfían de la autoridad. Ladrones astutos, exploradores independientes y algunos hechiceros son de alineamiento Caótico Neutral.'),
(7,'Legal Malvado','LM','Utilizan las leyes y la autoridad para sus propios fines malévolos. Tiranos, hechiceros oscuros y algunos aristócratas malvados son de alineamiento Legal Malvado.'),
(8,'Neutral Malvado','NM','Buscan su propio interés sin inclinarse hacia la bondad o la maldad. Asesinos a sueldo, necromantes y algunos monstruos sin escrúpulos pueden tener alineamiento Neutral Malvado.'),
(9,'Caótico Malvado','CM','Siguen su propio camino sin restricciones morales. Demonios, brujos oscuros y algunos invocadores de caos son de alineamiento Caótico Malvado.');

-- Crear la tabla ascendencias
CREATE TABLE `ascendencias` (
  `id_ascendencia` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id_ascendencia`)
) ;

-- Insertar datos en la tabla ascendencias
INSERT INTO `ascendencias` VALUES 
(1,'Enano','Resistentes y hábiles en la forja.'),
(2,'Mediano','Versátiles y adaptativos.'),
(3,'Gnomo','Conocedores de la magia y la ingeniería.'),
(4,'Elfo','Élficos y ágiles.'),
(5,'Humano','Versátiles y adaptables.'),
(6,'Dracónido','Descendientes de dragones.'),
(7,'Tiefling','Con sangre infernal.'),
(8,'Semiorco','Una mezcla de orcos y humanos.'),
(9,'Semielfo','Una mezcla de elfos y humanos.'),
(10,'Arakocra','Humanoide aviario con la capacidad de volar.'),
(11,'Aasimar','Ser celestial con un toque de ascendencia divina.'),
(12,'Genasí de aire','Descendientes de elementales de aire, encarnando las cualidades del aire.'),
(13,'Genasi de Tierra','Descendientes de elementales de tierra, encarnando las cualidades de la tierra.'),
(14,'Genasi de Fuego','Descendientes de elementales de fuego, encarnando las cualidades del fuego.'),
(15,'Genasi de Agua','Descendientes de elementales de agua, encarnando las cualidades del agua.'),
(16,'Centauro','Humanoide con la parte inferior del cuerpo de un caballo.'),
(17,'Bugbear','Goblinoides grandes y amenazantes con talento para el sigilo.'),
(18,'Changeling','Cambiantes con la capacidad de cambiar de apariencia a voluntad.'),
(19,'Gnomo de las profundidades','Gnomos adaptados al entorno subterráneo.'),
(20,'Duergar','Enanos grises con resistencia a la magia y habilidades en la oscuridad.'),
(21,'Eladrin','Ser similar a los elfos asociado con el Feywild, exhibiendo una conexión con la magia.'),
(22,'Hada','Ser mágico diminuto asociado con la naturaleza y el Fey.'),
(23,'Firbolg','Pariente gigante conocido por su afinidad con la naturaleza y habilidades mágicas.'),
(24,'Githyanki','Raza humanoid guerreriza proveniente del Plano Astral.'),
(25,'Githzerai','Raza humanoid monástica proveniente del Plano Astral.'),
(26,'Goblin','Humanoides pequeños y astutos conocidos por su ingenio y sigilo.'),
(27,'Goliat','Humanoides poderosos y robustos adaptados a regiones montañosas.'),
(28,'Harengon','Raza humanoid nómada y ágil con características felinas.'),
(29,'Hobgoblin','Goblinoides disciplinados y militaristas con habilidad estratégica.'),
(30,'Kenku','Humanoides aviarios conocidos por la imitación y talentos artísticos.'),
(31,'Kobold','Humanoides reptilianos pequeños con amor por las trampas y túneles.'),
(32,'Lizardfolk','Humanoides primitivos y reptilianos con habilidades naturales de supervivencia.'),
(33,'Minotauro','Humanoides con cabeza de toro conocidos por su fuerza y conexiones laberínticas.'),
(34,'Orco','Humanoides agresivos y poderosos con una cultura marcial.'),
(35,'Sátiro','Humanoides alegres amantes de la música con características de cabra.'),
(36,'Elfo marino','Elfos adaptados a entornos acuáticos con una conexión al mar.'),
(37,'Shadar Kai','Humanoides sombríos con conexión al Shadowfell.'),
(38,'Cambiaformas','Cambiantes con una habilidad versátil para cambiar su forma.'),
(39,'Tabaxi','Humanoides con aspecto de gato conocidos por su agilidad y curiosidad.'),
(40,'Tortuga','Tortugas humanoides con armadura natural y habilidades acuáticas.'),
(41,'Tritón','Raza acuática humanoid con conexión a los mares.'),
(42,'Yuan-ti','Humanoides serpenteantes con una mezcla de rasgos humanos y de serpiente.');

-- Crear la tabla clases
CREATE TABLE `clases` (
  `id_clase` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `dado_golpe` int DEFAULT NULL,
  `descripcion` text,
  PRIMARY KEY (`id_clase`)
) ;

-- Insertar datos en la tabla clases
INSERT INTO `clases` VALUES 
(1,'Picaro',8,'Maestro del sigilo y el engaño.'),
(2,'Mago',6,'Manipulador de la magia arcana.'),
(3,'Druida',8,'Guardián de la naturaleza con habilidades místicas.'),
(4,'Brujo',8,'Hace pactos con seres poderosos para obtener magia.'),
(5,'Hechicero',6,'Innato lanzador de hechizos.'),
(6,'Explorador',10,'Maestro de la supervivencia y la exploración.'),
(7,'Guerrero',10,'Experto en combate y tácticas marciales.'),
(8,'Clerigo',8,'Sirviente de una deidad, dotado de poder divino.'),
(9,'Paladin',10,'Caballero sagrado con habilidades divinas.'),
(10,'Barbaro',12,'Feroz guerrero que entra en un frenesí.'),
(11,'Monje',8,'Maestro en artes marciales y disciplinas espirituales.'),
(12,'Artifice',8,'Experto en la creación de objetos mágicos y artilugios.'),
(13,'Bardo',8,'Entretenedor mágico y habilidoso en muchas áreas.');


-- Crear la tabla personajes
CREATE TABLE `personajes` (
  `id_personaje` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `id_clase` int DEFAULT NULL,
  `id_ascendencia` int DEFAULT NULL,
  `id_alineamiento` int DEFAULT NULL,
  `id_jugador` int DEFAULT NULL,
  `nivel` int DEFAULT NULL,
  `CA` int DEFAULT NULL,
  `PG` int DEFAULT NULL,
  `percepcion_pasiva` int DEFAULT NULL,
  `iniciativa` int DEFAULT NULL,
  `cronica` varchar(1000) DEFAULT NULL,
  `fuerza` int DEFAULT NULL,
  `fuerza_mod` int DEFAULT NULL,
  `destreza` int DEFAULT NULL,
  `destreza_mod` int DEFAULT NULL,
  `constitucion` int DEFAULT NULL,
  `constitucion_mod` int DEFAULT NULL,
  `inteligencia` int DEFAULT NULL,
  `inteligencia_mod` int DEFAULT NULL,
  `sabiduria` int DEFAULT NULL,
  `sabiduria_mod` int DEFAULT NULL,
  `carisma` int DEFAULT NULL,
  `carisma_mod` int DEFAULT NULL,
  `retrato` longtext,
  PRIMARY KEY (`id_personaje`),
  KEY `id_clase` (`id_clase`),
  KEY `id_ascendencia` (`id_ascendencia`),
  KEY `id_alineamiento` (`id_alineamiento`),
  KEY `id_jugador` (`id_jugador`),
  CONSTRAINT `personajes_ibfk_2` FOREIGN KEY (`id_clase`) REFERENCES `clases` (`id_clase`),
  CONSTRAINT `personajes_ibfk_3` FOREIGN KEY (`id_ascendencia`) REFERENCES `ascendencias` (`id_ascendencia`),
  CONSTRAINT `personajes_ibfk_4` FOREIGN KEY (`id_alineamiento`) REFERENCES `alineamientos` (`id_alineamiento`),
  CONSTRAINT `personajes_ibfk_5` FOREIGN KEY (`id_jugador`) REFERENCES `jugadores` (`id_jugador`) ON DELETE CASCADE
) ;

-- Insertar datos en la tabla personajes
INSERT INTO `personajes` VALUES 
(1,'Morea Elurien',10,37,3,1,2,16,22,12,3,NULL,16,3,14,2,15,2,10,0,12,1,8,-1,NULL),
(3,'Kylden',7,4,2,3,10,18,50,13,6,NULL,14,2,12,1,15,2,10,0,8,-1,16,3,NULL),
(5,'Morea Elurien',10,37,3,2,2,16,22,12,3,NULL,16,3,14,2,15,2,10,0,12,1,8,-1,NULL);

-- Crear la tabla habilidades
CREATE TABLE `habilidades` (
  `id_habilidad` int NOT NULL AUTO_INCREMENT,
  `id_personaje` int DEFAULT NULL,
  `atletismo` int DEFAULT NULL,
  `acrobacias` int DEFAULT NULL,
  `juego_de_manos` int DEFAULT NULL,
  `sigilo` int DEFAULT NULL,
  `arcano` int DEFAULT NULL,
  `historia` int DEFAULT NULL,
  `investigacion` int DEFAULT NULL,
  `naturaleza` int DEFAULT NULL,
  `religion` int DEFAULT NULL,
  `trato_de_animales` int DEFAULT NULL,
  `medicina` int DEFAULT NULL,
  `percepcion` int DEFAULT NULL,
  `perspicacia` int DEFAULT NULL,
  `supervivencia` int DEFAULT NULL,
  `engano` int DEFAULT NULL,
  `intimidacion` int DEFAULT NULL,
  `interpretacion` int DEFAULT NULL,
  `persuasion` int DEFAULT NULL,
  PRIMARY KEY (`id_habilidad`),
  KEY `id_personaje` (`id_personaje`),
  CONSTRAINT `habilidades_ibfk_1` FOREIGN KEY (`id_personaje`) REFERENCES `personajes` (`id_personaje`) ON DELETE CASCADE
) ;

-- Insertar datos en la tabla habilidades
INSERT INTO `habilidades` VALUES 
(1,1,2,4,3,5,0,1,-1,2,3,0,2,4,1,3,2,1,0,3),
(3,3,4,3,1,2,2,3,-1,4,2,0,2,3,4,3,2,1,0,3);

drop user if exists sesioncero;
create user sesioncero identified by 'sesioncero';
grant all privileges on dungeons_and_dragons.* to sesioncero;