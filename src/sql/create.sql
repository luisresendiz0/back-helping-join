create database db_helping_join character set utf8mb4 collate utf8mb4_spanish_ci;
use db_helping_join;

create table voluntario(
	id_voluntario int not null auto_increment,
    nombre varchar(256) not null,
	edad date not null,
    email varchar(256) not null,
    direccion varchar(256) not null,
    imagen varchar(700) not null,
    contrasena varchar(256) not null,
    primary key(id_voluntario)
);
create table categoria(
	id_categoria int not null auto_increment,
    nombre varchar(256) not null,
    primary key (id_categoria)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
);

create table voluntario_categoria(
	id_vc int not null auto_increment,
    id_voluntario int not null,
    id_categoria int not null,
    primary key (id_vc),
    constraint fk_vc_voluntario foreign key (id_voluntario) references voluntario(id_voluntario),
    constraint fk_vc_categoria foreign key (id_categoria) references categoria(id_categoria)
);

-- alter table voluntario_categoria add constraint fk_idVoluntario foreign key (id_Voluntario) references voluntario(idVoluntario) on delete restrict on update restrict;
-- alter table voluntario_categoria add constraint fk_idCategoria foreign key (id_Categoria) references categoria(idCategoria) on delete restrict on update restrict;

create table beneficiado(
	id_beneficiado int not null auto_increment,
    nombre varchar(256) not null,
    imagen varchar(700) not null,
    tipo enum('organizacion','civil') not null,
    direccion varchar(256) not null,
    telefono varchar(10) not null,
    descripcion text(700) not null,
    responsable varchar(256) not null,
    email varchar(256) not null,
    contrasena varchar(256) not null,
    evento_eliminados int not null,
    primary key (id_beneficiado)
);

create table beneficiado_categoria(
	id_bc int not null auto_increment,
    id_beneficiado int not null,
    id_categoria int not null,
    primary key (id_bc),
    constraint fk_bc_beneficiado foreign key (id_beneficiado) references beneficiado(id_beneficiado),
    constraint fk_bc_categoria foreign key (id_categoria) references categoria(id_categoria)
);

-- alter table beneficiado_categoria add constraint fk_idBeneficiado foreign key (id_Beneficiado) references beneficiado(idBeneficiado) on delete restrict on update restrict;
-- alter table beneficiado_categoria add constraint fk_id_Categoria foreign key (id_Categoria) references categoria(idCategoria) on delete restrict on update restrict;

create table evento(
	id_evento int not null auto_increment,
    id_beneficiado int not null, 
    nombre varchar(256) not null,
    descripcion text(700) not null,
    fecha_inicio datetime not null default current_timestamp,
    fecha_fin datetime not null,
    direccion varchar(256) not null,
    imagen varchar(700) not null,
    primary key (id_evento),
    constraint fk_evento_beneficiado foreign key (id_beneficiado) references beneficiado(id_beneficiado)
);

-- alter table evento add constraint fk_id_Beneficiado foreign key (id_Beneficiado) references beneficiado(idBeneficiado) on delete cascade on update cascade;

create table evento_categoria(
	id_ec int not null auto_increment,
    id_evento int not null,
    id_categoria int not null,
    primary key (id_ec),
    constraint fk_ec_evento foreign key (id_evento) references evento(id_evento),
    constraint fk_ec_categoria foreign key (id_categoria) references categoria(id_categoria)
);

-- alter table evento_categoria add constraint fk_idEvento foreign key (id_Evento) references evento(idEvento) on delete restrict on update restrict;
-- alter table evento_categoria add constraint fk_id_Categori foreign key (id_Categoria) references categoria(idCategoria) on delete restrict on update restrict;

create table evento_voluntario(
	id_ev int not null auto_increment,
    id_evento int not null,
    id_voluntario int not null,
    primary key (id_ev),
    constraint fk_ev_evento foreign key (id_evento) references evento(id_evento),
    constraint fk_ev_voluntario foreign key (id_voluntario) references voluntario(id_voluntario)
);
-- alter table evento_voluntario add constraint fk_id_Evento foreign key (id_Evento) references evento(idEvento) on delete cascade on update cascade;
-- alter table evento_voluntario add constraint fk_id_Voluntario foreign key (id_Voluntario) references voluntario(idVoluntario) on delete cascade on update cascade;

create table normalizacion(
	id_normalizacion int not null auto_increment,
    id_evento int not null,
    matriz text,
    primary key (id_normalizacion),
    constraint fk_normalizacion_evento foreign key (id_evento) references evento(id_evento)
);

create table reporte(
	id_reporte int not null auto_increment,
    id_evento int not null,
    id_voluntario int not null,
    descripcion text(500) not null,
    fecha datetime not null default current_timestamp,
    estatus enum('pendiente','eliminado') not null,
    primary key (id_reporte),
    constraint fk_reporte_evento foreign key (id_evento) references evento(id_evento),
    constraint fk_reporte_voluntario foreign key (id_voluntario) references voluntario(id_voluntario)
);

-- alter table reporte add constraint fk_id_Event foreign key (id_Evento) references evento(idEvento) on delete cascade on update cascade;
-- alter table reporte add constraint fk_id_Voluntari foreign key (id_Voluntario) references voluntario(idVoluntario) on delete cascade on update cascade;

create table moderador(
	id_moderador int not null auto_increment,
    nombre varchar(256) not null,
    primary key (id_moderador)
);