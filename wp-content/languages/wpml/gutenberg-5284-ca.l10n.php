<?php
return ['messages'=>['
<input style="width:95%; padding:0.75rem; border:1px solid #007FAD; border-radius:5px;" type="text" onkeyup="filter(this)" placeholder="Palabra a buscar"/>

<script>
    function normalizeSearch(text) {
        return text
            .toLowerCase()
            .normalize(\'NFD\')
            .replace(/[\\u0300-\\u036f]/g, \'\');
    }

    function filter(element) {
        var value = normalizeSearch(jQuery(element).val());

        jQuery(".post-list > li").each(function () {
            var text = normalizeSearch(jQuery(this).text());

            if (text.indexOf(value) > -1) {
                jQuery(this).show();
            } else {
                jQuery(this).hide();
            }
        });
    }
</script>
'=>'<input style="width:95%; padding:0.75rem; border:1px solid #007FAD; border-radius:5px;" type="text" onkeyup="filter(this)" placeholder="Paraula a cercar"/>

<script>
    function normalizeSearch(text) {
        return text
            .toLowerCase()
            .normalize(\'NFD\')
            .replace(/[\\u0300-\\u036f]/g, \'\');
    }

    function filter(element) {
        var value = normalizeSearch(jQuery(element).val());

        jQuery(".post-list > li").each(function () {
            var text = normalizeSearch(jQuery(this).text());

            if (text.indexOf(value) > -1) {
                jQuery(this).show();
            } else {
                jQuery(this).hide();
            }
        });
    }
</script>',' Hogar Municipal del Transeúnte (León)'=>' Hogar Municipal del Transeúnte (León)','00ca06e2353bc301ca8d98c9a065bd58'=>'Sant Joan de Déu Serveis Sociosanitaris (Esplugues de Llobregat) ','08707c51576ed754a7a82719f89e77ee'=>'Hospital San Juan de Dios (San Sebastián)','089283d23bedcde3e750a4a32ef1f1a2'=>'<strong>Hospitalario, cuidados paliativos</strong><br><br>Coordinadora de Voluntariado SJD: Raquel Fernández<br><br>E-mail: raquel.fernandezb@sjd.es<br><br>Tel.: 608 750 572','089fe519e6832ca688b182c4b9e7d6da'=>'<strong>Salud mental</strong><br><br>Coordinadora de Voluntariado SJD: Nerea Sanz<br><br>E-mail: nerea.sanz@sjd.es<br><br>Tel.: 672 106 536','093ec7c15152ae64ce6d9686d728c8e9'=>'Obra Social San Juan de Dios (Madrid)','0bfbf9b915041f03bd4f86e576316560'=>'Hospital San Juan de Dios (Córdoba)','12a4645e15b773b0920da15578a91963'=>'Fundació Germà Benito Benni (Sant Boi de Llobregat, Barcelona, y Almacelles, Lleida)','12aa72a00f280d12c29c29e88271182c'=>'Hospital San Juan de Dios (León)','13c95c4d352b4f5c09d059e57199da5f'=>'<strong>Social </strong><br><br>Coordinadora de Voluntariado SJD: Esther Alcón<br><br>E-mail: esther.alcon@sjd.es<br><br>Telf.: 674 341 066','1a0333b3d920707c22b7cf0d220464b8'=>'Residencia San Juan de Dios Antequera (Málaga)','1cc7bb50b81b527686f789784b1ccbf1'=>'Fundación Juan Ciudad ONGD (Madrid)','1d58c53670ca470248109797894fe316'=>'<strong>Salud mental, discapacidad, social</strong><br>Coordinadora de Voluntariado SJD: Cristina Marcos López<br><br>E-mail: cristina.marcos@sjd.es<br><br>Tel.: 673 881 194','1f4465c7fc83f40af23a518f35ac5494'=>'Hospital Fundación San José (Madrid)','2042085ee56a5be2433d7990c18191a8'=>'<strong>Personas mayores</strong><br><br>Coordinador de Voluntariado SJD: Hno. Chema Montserrat Montesdeoca.<br><br>E-mail: chema.montserrat@sjd.es / Tel.: 673 660 502','291bf360bab09e013b3b59a5ee4b1fe3'=>'Hospital San Juan de Dios del Aljarafe (Bormujos, Sevilla)','343b172c577b2d70d58b4b8cc625e81f'=>'<strong>Hospitalario</strong><br><br>Coordinadora de Voluntariado SJD: Pili Huarte Artigas<br><br>E-mail: hospitalpamplona.voluntariado@sjd.es / mariapilar.huarte@sjd.es<br><br>Tel.: 673 61 16 34','3516f129a5e6c4d989a4a990466b4beb'=>'<strong>Salud mental, dependencia, trastornos cognitivos</strong><br><br>Coordinadora de Voluntariado SJD: Laura Fernández Ortiz<br><br>E-mail: laura.fernandezo@sjd.es<br><br>Telf.: 934 706 412  /  697 30 07 74','3828a371a3886ba74753e41061c276f4'=>'Hospital San Juan de Dios (Burgos)','3c1e53b99692fcbda0f0fb0b583cf573'=>'<strong>Personas sin hogar</strong><br><br>Coordinadora de Voluntariado SJD: Sara Dorado Quintana<br><br>E-mail: sara.dorado@sjd.es<br><br>Tel.: 917 662 087','4073e93e3a30486682b36995d4de29b1'=>'Hospital San Juan Grande (Jerez de la Frontera, Cádiz) ','428fb3521709629ebcb895752719eff7'=>'<strong>Familias en riesgo de exclusión social</strong><br><br>Coordinadora de Voluntariado SJD: Carmen Tarrafeta<br><br>E-mail: carmen.tarrafeta@sjd.es<br><br>Telf.: 971 265 854 (Ext. 1805)','429b6c857a242130b23d7a401fae3674'=>'Escuela Universitaria de Enfermería y Fisioterapia San Juan de Dios - Comillas Campus Bormujos (Bormujos, Sevilla)','45b09e7649a6267a0e24c2f726f03278'=>'<strong>Hospitalario, infancia</strong><br><br>Coordinadoras de Voluntariado SJD: Mireia Espinet Gimeno y Mercè Francisco Bordas<br><br>E-mail: mireia.espinet@sjd.es / merce.francisco@sjd.es<br><br>Tel.: 671 074 479 / 932 532 146<br><br>Coordinadora de Voluntariado Obra Social SJD: Judit Mateu<br><br>E-mail: judit.mateu@sjd.es<br><br>Tel.: 677 593 032','4d9dee4f4810787770c1c20f8090f843'=>'Sant Joan de Déu Terres de Lleida (Lleida)','5188bf834d169c9468eae27dcb743441'=>'<strong>Hospitalario, Maternidad</strong><br><br>Coordinadora de Voluntariado SJD: Isabel de la Haba<br><br>E-mail: isabel.dehaba@sjd.es<br><br>Tel.: 957 00 46 00 (Ext. 807)  /  673 14 48 25','530e1479dccad59b9cd873460f911249'=>'<strong>Social, personas sin hogar</strong><br><br>Coordinadora de Voluntariado SJD: Laura Abril Albalá<br><br>E-mail: laura.abrila@sjd.es<br><br>Tel.: 987 23 23 00 (Ext 710)<br>671 09 72 17','58ee49a415878bc745d643d469252cf1'=>'<strong>Hospitalario, economato social</strong><br><br>Coordinadora de Voluntariado SJD: María Remedios Melgar García<br><br>E-mail: mariaremedios.melgar@sjd.es<br><br>Tel.: 956 357 300','5ba66f6712ebe45b70f086b7b9d79a71'=>'<strong>Salud mental, hospitalario, cuidados paliativos, mayores, discapacidad</strong><br><br>Coordinadora de Voluntariado SJD: Elisabet Carrasco y Elisabet Ruíz<br><br>E-mail: elisabet.carrasco@sjd.es / elisabet.ruizc@sjd.es<br><br>Tel.: 672 387 313 /671 658 480','5e6a1e2eca24ee32166d4755867e087a'=>'Hospital San Rafael (Granada)','5f0b474a0ac2ab2d41950a4638606476'=>'<strong>Discapacidad intelectual, mayores</strong><br><br>Coordinador de Voluntariado SJD: Efrén D. García<br><br>E-mail: efren.garcia@sjd.es<br><br>Tel.: 673 770 310','60c27868ac4d53d990dfd6431df33e8b'=>'Sant Joan de Déu València','630843dc519137631b776cd67934bd2f'=>'Residencia San Juan de Dios - Obra Social (Madrid)','64948c5eebe256e1c502bf29fe12908c'=>'Obra Social Sant Joan de Déu (Barcelona)','64f9cf836cd83cfe689a71c87241d641'=>'Fundació Bayt Al-Thaqafa (Barcelona)','6a5045cf7816bdbcd6dfe63ad009b5f9'=>'<strong>Hospitalario, cuidados paliativos</strong><br><br>Coordinadora de Voluntariado SJD: Carmen Tarrafeta<br><br>E-mail: carmen.tarrafeta@sjd.es<br><br>Tel.: 673 199 338','6b8abd6069550715769ee198726ee915'=>'<strong>Hospitalario, mayores, cuidados paliativos</strong><br><br>Coordinadora de Voluntariado SJD: Rosa Fombellida Gómez<br><br>E-mail: mariarosa.fombellida@sjd.es<br><br>Tel.: 942 217 711 (Ext. 421)','6efd240e4dcf68afaa38170c9e875ef7'=>'<strong>Docente</strong><br><br>Coordinadoras de Voluntariado SJD: Almudena Arroyo Rodríguez  /  Laura Fernandez Bueno<br><br>E-mail: almudena.arroyo@sjd.edu.es / laura.fernandezb@sjd.edu.es<br><br>Tel.: 695 221 816 / 652 015 063','6fcfecf8856344fad7ae61c6cd65452f'=>'Centro San Juan de Dios (Valladolid)','6fd0a332e15a87330aad81036041dce9'=>'Servicios Sociales San Juan de Dios (Sevilla)','72828869a2653502514370abaf4fcbcd'=>'<strong>Obra Social</strong><br>Coordinadora de Voluntariado SJD: Susana Oñoro Barba<br><br>E-mail: curia.obrasocial@sjd.es<br><br>Tel.: 913 874 479','73999be390770951c15fbdc02d86bb8d'=>'Coordinadora de Voluntariado SJD: Julia Merchán

E-mail: julia.merchan@sjd.es

Tel.: 600 564 971','76bb834e2eb1b90114a07f068143ab60'=>'<strong>Hospitalario</strong><br><br>Coordinador de Voluntariado SJD: Hno. Chema Montserrat Montesdeoca<br><br>E-mail: chema.montserrat@sjd.es<br><br>Tel.: 673 660 502','779a79bcc4272fe862c42fcd4850eac5'=>'<strong>Buscar centre</strong>','7a425c278bf9ad2e09b1091f92b417d5'=>'Hogar y Clínica San Rafael (Vigo) ','7d02714195a6f5206e4312cd2ed6c925'=>'<strong>Social, personas sin hogar</strong><br><br>Coordinadores de Voluntariado SJD: Ana María Caballero y José Antonio Puche<br><br>E-mail: ana@jesusabandonado.org / voluntarios@jesusabandonado.org<br><br>Tel.: 637 101 821 / 629 345 209','7d6c9dfac94ad2b634c61f3712f4eeff'=>'<strong>Hospitalario, discapacidad, comedor social</strong><br><br>Coordinadoras de Voluntariado SJD: Inés Riera y Verónica García<br><br>E-mail: ines.riera@sjd.es / veronica.garcial@sjd.es<br><br>Tel.: 663 701 176 / 958 275 700','81602f48393470d0efeabb02af86e95d'=>'<strong>Salud Mental</strong><br><br>Coordinador de Voluntariado SJD: Hno. Manolo Guerrero<br><br>E-mail: josemanuel.guerrero@sjd.es<br><br>Tel.: 628 94 34 33','829e01bb6c12cf9e12e8f177451c00e2'=>'Sant Joan de Déu Serveis Socials (Mallorca)','894816c0d6c8350ddc0cbfa1d0559ee6'=>'Hogar San Juan de Dios (Granada)','89e7ba2748117a3baa6f281a5f95ac86'=>' Hogar Municipal del Transeúnte (León)','8a2104ad9445eee8663d0b3111fa66b6'=>'<strong>Discapacidad intelectual</strong><br><br>Coordinadora de Voluntariado SJD: Olalla Carril Lombardero<br><br>E-mail: olalla.carril@sjd.es<br><br>Tel.:  986 232 740  /  658 03 77 88','8b2c75d59247e3587094fdd4f7ba44c6'=>'Fundación Tutelar Padre Miguel García Blanco (Sevilla)','8dd3bf73694a10fc37a0f7832a739ecc'=>'Hospital Universitario San Rafael (Madrid)','8e9b1ad62fa0d7138aa318c9b8f96e21'=>'<strong>Discapacidad intelectual</strong><br><br>Coordinadora de Voluntariado SJD: María José Rey de Sola<br><br>E-mail: mariajose.rey@sjd.es<br><br>Tel.: 983 222 875 (Ext. 321)','8ee53aec84232b87626e363b7cdfd9de'=>'Centro Santa María de la Paz (Madrid)','8ff5969d06112fe3a3a121bd788781a0'=>'<strong>Personas mayores</strong><br><br>Coordinador de Voluntariado SJD: Luis Manuel Alcántara Jiménez<br><br>E-mail: luis.alcantara@sjd.es<br><br>Telf.: 674 359 866 (3196)','975e2791cfdcc1a4307b7092e1e54d5c'=>'<strong>Salud mental, discapacidad, psicogeriatría</strong><br><br>Coordinadora de Voluntariado SJD: Eba Ruiz de Azua Oyanguren<br><br>E-mail: eba.ruizazua@sjd.es<br><br>Tel.: 943 793 900  /   610 20 61 76','9948f39b32184803f229a3c2ae7abfd8'=>'<strong>Personas mayores</strong><br><br>Coordinadora de Voluntariado SJD: María Suárez<br><br>E-mail: residenciamadrid@sjd.es<br><br>Telf.: 913 440 020','9a3cd1d2ef2cac768a01bb8e2fff96d0'=>'<strong>Personas sin hogar</strong><br><br>Coordinadora de Voluntariado SJD: Montserrat Alert<br><br>E-mail: montserrat.alert@sjd.es<br><br>Telf.: 673 275 384','9b5ce4e31fdea2581b9faba68705cc0a'=>'<strong>Hospitalario, cuidados paliativos</strong><br><br>Coordinadora de Voluntariado SJD: Iraide Sesmero Arroyuelos<br><br>E-mail: iraide.sesmero@sjd.es<br><br>Tel.: 673 627 375','<strong>Buscar centro</strong>'=>'<strong>Buscar centre</strong>','<strong>Captación de fondos, sensibilización, comunicación y proyectos</strong>

Coordinador de Voluntariado SJD: Xavier Ticó Ferrer

E-mail: xavier.tico@sjd.es

Tel.: 932 532 136 (ext. 140) / 661 770 017'=>'<strong>Captación de fondos, sensibilización, comunicación y proyectos</strong><br><br>Coordinador de Voluntariado SJD: Xavier Ticó Ferrer<br><br>E-mail: xavier.tico@sjd.es<br><br>Tel.: 932 532 136 (ext. 140) / 661 770 017','<strong>Cooperación internacional</strong>
Coordinadora de Voluntariado SJD: M.ª de los Ángeles Lobo

E-mail: juanciudad.voluntariado@sjd.es

Tel.: 617 935 143'=>'<strong>Cooperación internacional</strong><br>Coordinadora de Voluntariado SJD: M.ª de los Ángeles Lobo<br><br>E-mail: juanciudad.voluntariado@sjd.es<br><br>Tel.: 617 935 143','<strong>Discapacidad intelectual, mayores</strong>

Coordinador de Voluntariado SJD: Efrén D. García

E-mail: efren.garcia@sjd.es

Tel.: 673 770 310'=>'<strong>Discapacidad intelectual, mayores</strong><br><br>Coordinador de Voluntariado SJD: Efrén D. García<br><br>E-mail: efren.garcia@sjd.es<br><br>Tel.: 673 770 310','<strong>Discapacidad intelectual</strong>

Coordinadora de Voluntariado SJD: María José Rey de Sola

E-mail: mariajose.rey@sjd.es

Tel.: 983 222 875 (Ext. 321)'=>'<strong>Discapacidad intelectual</strong><br><br>Coordinadora de Voluntariado SJD: María José Rey de Sola<br><br>E-mail: mariajose.rey@sjd.es<br><br>Tel.: 983 222 875 (Ext. 321)','<strong>Discapacidad intelectual</strong>

Coordinadora de Voluntariado SJD: Olalla Carril Lombardero

E-mail: olalla.carril@sjd.es

Tel.:  986 232 740  /  658 03 77 88'=>'<strong>Discapacidad intelectual</strong><br><br>Coordinadora de Voluntariado SJD: Olalla Carril Lombardero<br><br>E-mail: olalla.carril@sjd.es<br><br>Tel.:  986 232 740  /  658 03 77 88','<strong>Discapacidad, servicios sociales</strong>

Coordinador de Voluntariado SJD: Miguel Collantes

E-mail: miguel.collantes@sjd.es

Tel.: 663 984 701'=>'<strong>Discapacidad, servicios sociales</strong><br><br>Coordinador de Voluntariado SJD: Miguel Collantes<br><br>E-mail: miguel.collantes@sjd.es<br><br>Tel.: 663 984 701','<strong>Discapacidad</strong>

Coordinador de Voluntariado SJD: Santiago Ablanedo Mingot

E-mail: santiago.ablanedo@sjd.es

Telf.: 985 362 311'=>'<strong>Discapacidad</strong><br><br>Coordinador de Voluntariado SJD: Santiago Ablanedo Mingot<br><br>E-mail: santiago.ablanedo@sjd.es<br><br>Telf.: 985 362 311','<strong>Discapacidad</strong>
Coordinadora de Voluntariado SJD: Inés Riera

E-mail: ines.riera@sjd.es

Tel.: 663 701 176'=>'<strong>Discapacidad</strong><br>Coordinadora de Voluntariado SJD: Inés Riera<br><br>E-mail: ines.riera@sjd.es<br><br>Tel.: 663 701 176','<strong>Docencia</strong>
Coordinadoras de Voluntariado SJD: Begoña Fernández y María Corvillo.

E-mail: begona.fernandez@sjd.es / maria.corvillo@sjd.es

Tel.: 674 369 907 / 673 143 818'=>'<strong>Docencia</strong><br>Coordinadoras de Voluntariado SJD: Begoña Fernández y María Corvillo.<br><br>E-mail: begona.fernandez@sjd.es / maria.corvillo@sjd.es<br><br>Tel.: 674 369 907 / 673 143 818','<strong>Docente</strong>

Coordinadoras de Voluntariado SJD: Almudena Arroyo Rodríguez  /  Laura Fernandez Bueno

E-mail: almudena.arroyo@sjd.edu.es / laura.fernandezb@sjd.edu.es

Tel.: 695 221 816 / 652 015 063'=>'<strong>Docente</strong><br><br>Coordinadoras de Voluntariado SJD: Almudena Arroyo Rodríguez  /  Laura Fernandez Bueno<br><br>E-mail: almudena.arroyo@sjd.edu.es / laura.fernandezb@sjd.edu.es<br><br>Tel.: 695 221 816 / 652 015 063','<strong>Familias en riesgo de exclusión social</strong>

Coordinadora de Voluntariado SJD: Carmen Tarrafeta

E-mail: carmen.tarrafeta@sjd.es

Telf.: 971 265 854 (Ext. 1805)'=>'<strong>Familias en riesgo de exclusión social</strong><br><br>Coordinadora de Voluntariado SJD: Carmen Tarrafeta<br><br>E-mail: carmen.tarrafeta@sjd.es<br><br>Telf.: 971 265 854 (Ext. 1805)','<strong>Hospitalario, Cuidados Paliativos, Infancia y discapacidad</strong>

Coordinadora de Voluntariado SJD: Sara Martín Blanco

E-mail: sara.martinb@sjd.es

Tel.: 673 135 532'=>'<strong>Hospitalario, Cuidados Paliativos, Infancia y discapacidad</strong><br><br>Coordinadora de Voluntariado SJD: Sara Martín Blanco<br><br>E-mail: sara.martinb@sjd.es<br><br>Tel.: 673 135 532','<strong>Hospitalario, Maternidad</strong>

Coordinadora de Voluntariado SJD: Isabel de la Haba

E-mail: isabel.dehaba@sjd.es

Tel.: 957 00 46 00 (Ext. 807)  /  673 14 48 25'=>'<strong>Hospitalario, Maternidad</strong><br><br>Coordinadora de Voluntariado SJD: Isabel de la Haba<br><br>E-mail: isabel.dehaba@sjd.es<br><br>Tel.: 957 00 46 00 (Ext. 807)  /  673 14 48 25','<strong>Hospitalario, cuidados paliativos</strong>

Coordinadora de Voluntariado SJD: Carmen Tarrafeta

E-mail: carmen.tarrafeta@sjd.es

Tel.: 673 199 338'=>'<strong>Hospitalario, cuidados paliativos</strong><br><br>Coordinadora de Voluntariado SJD: Carmen Tarrafeta<br><br>E-mail: carmen.tarrafeta@sjd.es<br><br>Tel.: 673 199 338','<strong>Hospitalario, cuidados paliativos</strong>

Coordinadora de Voluntariado SJD: Iraide Sesmero Arroyuelos

E-mail: iraide.sesmero@sjd.es

Tel.: 673 627 375'=>'<strong>Hospitalario, cuidados paliativos</strong><br><br>Coordinadora de Voluntariado SJD: Iraide Sesmero Arroyuelos<br><br>E-mail: iraide.sesmero@sjd.es<br><br>Tel.: 673 627 375','<strong>Hospitalario, cuidados paliativos</strong>

Coordinadora de Voluntariado SJD: Raquel Fernández

E-mail: raquel.fernandezb@sjd.es

Tel.: 608 750 572'=>'<strong>Hospitalario, cuidados paliativos</strong><br><br>Coordinadora de Voluntariado SJD: Raquel Fernández<br><br>E-mail: raquel.fernandezb@sjd.es<br><br>Tel.: 608 750 572','<strong>Hospitalario, discapacidad, comedor social</strong>

Coordinadoras de Voluntariado SJD: Inés Riera y Verónica García

E-mail: ines.riera@sjd.es / veronica.garcial@sjd.es

Tel.: 663 701 176 / 958 275 700'=>'<strong>Hospitalario, discapacidad, comedor social</strong><br><br>Coordinadoras de Voluntariado SJD: Inés Riera y Verónica García<br><br>E-mail: ines.riera@sjd.es / veronica.garcial@sjd.es<br><br>Tel.: 663 701 176 / 958 275 700','<strong>Hospitalario, economato social</strong>

Coordinadora de Voluntariado SJD: María Remedios Melgar García

E-mail: mariaremedios.melgar@sjd.es

Tel.: 956 357 300'=>'<strong>Hospitalario, economato social</strong><br><br>Coordinadora de Voluntariado SJD: María Remedios Melgar García<br><br>E-mail: mariaremedios.melgar@sjd.es<br><br>Tel.: 956 357 300','<strong>Hospitalario, infancia</strong>

Coordinadoras de Voluntariado SJD: Mireia Espinet Gimeno y Mercè Francisco Bordas

E-mail: mireia.espinet@sjd.es / merce.francisco@sjd.es

Tel.: 671 074 479 / 932 532 146

Coordinadora de Voluntariado Obra Social SJD: Judit Mateu

E-mail: judit.mateu@sjd.es

Tel.: 677 593 032'=>'<strong>Hospitalario, infancia</strong><br><br>Coordinadoras de Voluntariado SJD: Mireia Espinet Gimeno y Mercè Francisco Bordas<br><br>E-mail: mireia.espinet@sjd.es / merce.francisco@sjd.es<br><br>Tel.: 671 074 479 / 932 532 146<br><br>Coordinadora de Voluntariado Obra Social SJD: Judit Mateu<br><br>E-mail: judit.mateu@sjd.es<br><br>Tel.: 677 593 032','<strong>Hospitalario, mayores, cuidados paliativos</strong>

Coordinadora de Voluntariado SJD: Rosa Fombellida Gómez

E-mail: mariarosa.fombellida@sjd.es

Tel.: 942 217 711 (Ext. 421)'=>'<strong>Hospitalario, mayores, cuidados paliativos</strong><br><br>Coordinadora de Voluntariado SJD: Rosa Fombellida Gómez<br><br>E-mail: mariarosa.fombellida@sjd.es<br><br>Tel.: 942 217 711 (Ext. 421)','<strong>Hospitalario, mayores, soledad no deseada</strong>

Coordinadora de Obra Social: Patricia Castany

E-mail: patricia.castany@sjd.es

Tel: 673 34 12 05

Coordinadora de Voluntariado SJD Programa Soledad no deseada: Darling Montoya

E-mail: darling.montoya@sjd.es

Tel.: 607 564 452'=>'<strong>Hospitalario, mayores, soledad no deseada</strong><br><br>Coordinadora de Obra Social: Patricia Castany<br><br>E-mail: patricia.castany@sjd.es<br><br>Tel: 673 34 12 05<br><br>Coordinadora de Voluntariado SJD Programa Soledad no deseada: Darling Montoya<br><br>E-mail: darling.montoya@sjd.es<br><br>Tel.: 607 564 452','<strong>Hospitalario</strong>

Coordinador de Voluntariado SJD: Hno. Chema Montserrat Montesdeoca

E-mail: chema.montserrat@sjd.es

Tel.: 673 660 502'=>'<strong>Hospitalario</strong><br><br>Coordinador de Voluntariado SJD: Hno. Chema Montserrat Montesdeoca<br><br>E-mail: chema.montserrat@sjd.es<br><br>Tel.: 673 660 502','<strong>Hospitalario</strong>

Coordinadora de Voluntariado SJD: Laura Abril Albalá

E-mail: laura.abrila@sjd.es

Tel.:  987 23 25 00
987 23 23 00 (Ext 710)
671 09 72 17'=>'<strong>Hospitalario</strong><br><br>Coordinadora de Voluntariado SJD: Laura Abril Albalá<br><br>E-mail: laura.abrila@sjd.es<br><br>Tel.:  987 23 25 00<br>987 23 23 00 (Ext 710)<br>671 09 72 17','<strong>Hospitalario</strong>

Coordinadora de Voluntariado SJD: María Isabel de la Rosa Pérez

E-mail: maria.isabel.delarosa @sjd.es

Tel.: 617 020 080'=>'<strong>Hospitalario</strong><br><br>Coordinadora de Voluntariado SJD: María Isabel de la Rosa Pérez<br><br>E-mail: maria.isabel.delarosa @sjd.es<br><br>Tel.: 617 020 080','<strong>Hospitalario</strong>

Coordinadora de Voluntariado SJD: Pili Huarte Artigas

E-mail: hospitalpamplona.voluntariado@sjd.es / mariapilar.huarte@sjd.es

Tel.: 673 61 16 34'=>'<strong>Hospitalario</strong><br><br>Coordinadora de Voluntariado SJD: Pili Huarte Artigas<br><br>E-mail: hospitalpamplona.voluntariado@sjd.es / mariapilar.huarte@sjd.es<br><br>Tel.: 673 61 16 34','<strong>Hospitalario</strong>

Coordinadoras de Voluntariado SJD: María Ángeles Izquierdo y María Teresa Medina Duque

E-mail: mariaangeles.izquierdo@sjd.es / mariateresa.medina@sjd.es

Tel.: 673 911 659 / 663 768 042'=>'<strong>Hospitalario</strong><br><br>Coordinadoras de Voluntariado SJD: María Ángeles Izquierdo y María Teresa Medina Duque<br><br>E-mail: mariaangeles.izquierdo@sjd.es / mariateresa.medina@sjd.es<br><br>Tel.: 673 911 659 / 663 768 042','<strong>Immigración</strong>

Coordinadora de Voluntariado: Anna Eguia

E-mail: anna.eguia@bayt-al-thaqafa.org

Tel.:686 662 732'=>'<strong>Immigración</strong><br><br>Coordinadora de Voluntariado: Anna Eguia<br><br>E-mail: anna.eguia@bayt-al-thaqafa.org<br><br>Tel.:686 662 732','<strong>Mayores</strong>
Coordinadora de Voluntariado SJD: Lorena Meño

E-mail: utiii.programamayores@sjd.es

Tel.: 673 402 576'=>'<strong>Mayores</strong><br>Coordinadora de Voluntariado SJD: Lorena Meño<br><br>E-mail: utiii.programamayores@sjd.es<br><br>Tel.: 673 402 576','<strong>Obra Social</strong>
Coordinadora de Voluntariado SJD: Susana Oñoro Barba

E-mail: curia.obrasocial@sjd.es

Tel.: 913 874 479'=>'<strong>Obra Social</strong><br>Coordinadora de Voluntariado SJD: Susana Oñoro Barba<br><br>E-mail: curia.obrasocial@sjd.es<br><br>Tel.: 913 874 479','<strong>Personas mayores</strong>

Coordinador de Voluntariado SJD: Hno. Chema Montserrat Montesdeoca.

E-mail: chema.montserrat@sjd.es / Tel.: 673 660 502'=>'<strong>Personas mayores</strong><br><br>Coordinador de Voluntariado SJD: Hno. Chema Montserrat Montesdeoca.<br><br>E-mail: chema.montserrat@sjd.es / Tel.: 673 660 502','<strong>Personas mayores</strong>

Coordinador de Voluntariado SJD: Luis Manuel Alcántara Jiménez

E-mail: luis.alcantara@sjd.es

Telf.: 674 359 866 (3196)'=>'<strong>Personas mayores</strong><br><br>Coordinador de Voluntariado SJD: Luis Manuel Alcántara Jiménez<br><br>E-mail: luis.alcantara@sjd.es<br><br>Telf.: 674 359 866 (3196)','<strong>Personas mayores</strong>

Coordinadora de Voluntariado SJD: María Isabel Ramírez López

E-mail: isabel.ramirez@sjd.es

Tel.: 958 227 449'=>'<strong>Personas mayores</strong><br><br>Coordinadora de Voluntariado SJD: María Isabel Ramírez López<br><br>E-mail: isabel.ramirez@sjd.es<br><br>Tel.: 958 227 449','<strong>Personas mayores</strong>

Coordinadora de Voluntariado SJD: María Suárez

E-mail: residenciamadrid@sjd.es

Telf.: 913 440 020'=>'<strong>Personas mayores</strong><br><br>Coordinadora de Voluntariado SJD: María Suárez<br><br>E-mail: residenciamadrid@sjd.es<br><br>Telf.: 913 440 020','<strong>Personas sin hogar</strong>

Coordinadora de Voluntariado SJD: Fàtima Tortosa

E-mail: fatima.tortosa@sjd.es

Telf.: 607 59 21 57 /  96 366 50 70'=>'<strong>Personas sin hogar</strong><br><br>Coordinadora de Voluntariado SJD: Fàtima Tortosa<br><br>E-mail: fatima.tortosa@sjd.es<br><br>Telf.: 607 59 21 57 /  96 366 50 70','<strong>Personas sin hogar</strong>

Coordinadora de Voluntariado SJD: Montserrat Alert

E-mail: montserrat.alert@sjd.es

Telf.: 673 275 384'=>'<strong>Personas sin hogar</strong><br><br>Coordinadora de Voluntariado SJD: Montserrat Alert<br><br>E-mail: montserrat.alert@sjd.es<br><br>Telf.: 673 275 384','<strong>Personas sin hogar</strong>

Coordinadora de Voluntariado SJD: Sara Dorado Quintana

E-mail: sara.dorado@sjd.es

Tel.: 917 662 087'=>'<strong>Personas sin hogar</strong><br><br>Coordinadora de Voluntariado SJD: Sara Dorado Quintana<br><br>E-mail: sara.dorado@sjd.es<br><br>Tel.: 917 662 087','<strong>Salud Mental</strong>

Coordinador de Voluntariado SJD: Hno. Manolo Guerrero

E-mail: josemanuel.guerrero@sjd.es

Tel.: 628 94 34 33'=>'<strong>Salud Mental</strong><br><br>Coordinador de Voluntariado SJD: Hno. Manolo Guerrero<br><br>E-mail: josemanuel.guerrero@sjd.es<br><br>Tel.: 628 94 34 33','<strong>Salud mental, dependencia, hospitalario, social </strong>

Coordinadora de Voluntariado SJD: Núria Farre

E-mail: nuria.farrec@sjd.es

Telf.: 667 156 817'=>'<strong>Salud mental, dependencia, hospitalario, social </strong><br><br>Coordinadora de Voluntariado SJD: Núria Farre<br><br>E-mail: nuria.farrec@sjd.es<br><br>Telf.: 667 156 817','<strong>Salud mental, dependencia, trastornos cognitivos</strong>

Coordinadora de Voluntariado SJD: Laura Fernández Ortiz

E-mail: laura.fernandezo@sjd.es

Telf.: 934 706 412  /  697 30 07 74'=>'<strong>Salud mental, dependencia, trastornos cognitivos</strong><br><br>Coordinadora de Voluntariado SJD: Laura Fernández Ortiz<br><br>E-mail: laura.fernandezo@sjd.es<br><br>Telf.: 934 706 412  /  697 30 07 74','<strong>Salud mental, discapacidad, psicogeriatría</strong>

Coordinadora de Voluntariado SJD: Eba Ruiz de Azua Oyanguren

E-mail: eba.ruizazua@sjd.es

Tel.: 943 793 900  /   610 20 61 76'=>'<strong>Salud mental, discapacidad, psicogeriatría</strong><br><br>Coordinadora de Voluntariado SJD: Eba Ruiz de Azua Oyanguren<br><br>E-mail: eba.ruizazua@sjd.es<br><br>Tel.: 943 793 900  /   610 20 61 76','<strong>Salud mental, discapacidad, social</strong>
Coordinadora de Voluntariado SJD: Cristina Marcos López

E-mail: cristina.marcos@sjd.es

Tel.: 673 881 194'=>'<strong>Salud mental, discapacidad, social</strong><br>Coordinadora de Voluntariado SJD: Cristina Marcos López<br><br>E-mail: cristina.marcos@sjd.es<br><br>Tel.: 673 881 194','<strong>Salud mental, hospitalario, cuidados paliativos, mayores, discapacidad</strong>

Coordinadora de Voluntariado SJD: Elisabet Carrasco y Elisabet Ruíz

E-mail: elisabet.carrasco@sjd.es / elisabet.ruizc@sjd.es

Tel.: 672 387 313 /671 658 480'=>'<strong>Salud mental, hospitalario, cuidados paliativos, mayores, discapacidad</strong><br><br>Coordinadora de Voluntariado SJD: Elisabet Carrasco y Elisabet Ruíz<br><br>E-mail: elisabet.carrasco@sjd.es / elisabet.ruizc@sjd.es<br><br>Tel.: 672 387 313 /671 658 480','<strong>Salud mental</strong>

Coordinadora de Voluntariado SJD: Nerea Sanz

E-mail: nerea.sanz@sjd.es

Tel.: 672 106 536'=>'<strong>Salud mental</strong><br><br>Coordinadora de Voluntariado SJD: Nerea Sanz<br><br>E-mail: nerea.sanz@sjd.es<br><br>Tel.: 672 106 536','<strong>Social, Discapacidad, Salud mental</strong>

Coordinadora de Voluntariado SJD: Silvia Torralba

E-mail: silvia.torralba@sjd.es

Tel.: 674 491 378'=>'<strong>Social, Discapacidad, Salud mental</strong><br><br>Coordinadora de Voluntariado SJD: Silvia Torralba<br><br>E-mail: silvia.torralba@sjd.es<br><br>Tel.: 674 491 378','<strong>Social, Mayores, Discapacidad, Salud mental</strong>

Coordinadora de Voluntariado SJD: Marta Anfruns

E-mail: marta.anfruns@sjd.es

Tel.: 93 365 29 65'=>'<strong>Social, Mayores, Discapacidad, Salud mental</strong><br><br>Coordinadora de Voluntariado SJD: Marta Anfruns<br><br>E-mail: marta.anfruns@sjd.es<br><br>Tel.: 93 365 29 65','<strong>Social, personas sin hogar</strong>

Coordinadora de Voluntariado SJD: Laura Abril Albalá

E-mail: laura.abrila@sjd.es

Tel.: 987 23 23 00 (Ext 710)
671 09 72 17'=>'<strong>Social, personas sin hogar</strong><br><br>Coordinadora de Voluntariado SJD: Laura Abril Albalá<br><br>E-mail: laura.abrila@sjd.es<br><br>Tel.: 987 23 23 00 (Ext 710)<br>671 09 72 17','<strong>Social, personas sin hogar</strong>

Coordinadores de Voluntariado SJD: Ana María Caballero y José Antonio Puche

E-mail: ana@jesusabandonado.org / voluntarios@jesusabandonado.org

Tel.: 637 101 821 / 629 345 209'=>'<strong>Social, personas sin hogar</strong><br><br>Coordinadores de Voluntariado SJD: Ana María Caballero y José Antonio Puche<br><br>E-mail: ana@jesusabandonado.org / voluntarios@jesusabandonado.org<br><br>Tel.: 637 101 821 / 629 345 209','<strong>Social, salud mental, mayores, </strong>

Coordinadora de Voluntariado SJD: Rosaura Julián

E-mail: rosaura.julian@sjd.es

Tel.: 637 102 855'=>'<strong>Social, salud mental, mayores, </strong><br><br>Coordinadora de Voluntariado SJD: Rosaura Julián<br><br>E-mail: rosaura.julian@sjd.es<br><br>Tel.: 637 102 855','<strong>Social </strong>

Coordinadora de Voluntariado SJD: Esther Alcón

E-mail: esther.alcon@sjd.es

Telf.: 674 341 066'=>'<strong>Social </strong><br><br>Coordinadora de Voluntariado SJD: Esther Alcón<br><br>E-mail: esther.alcon@sjd.es<br><br>Telf.: 674 341 066','Centro San Juan de Dios (Valladolid)'=>'Centro San Juan de Dios (Valladolid)','Centro Santa María de la Paz (Madrid)'=>'Centro Santa María de la Paz (Madrid)','Ciudad San Juan de Dios Alcalá de Guadaíra (Sevilla) '=>'Ciudad San Juan de Dios Alcalá de Guadaíra (Sevilla) ','Clínica Nuestra Señora de La Paz (Madrid)'=>'Clínica Nuestra Señora de La Paz (Madrid)','Coordinadora de Voluntariado SJD: Julia Merchán

E-mail: julia.merchan@sjd.es

Tel.: 600 564 971'=>'Coordinadora de Voluntariado SJD: Julia Merchán

E-mail: julia.merchan@sjd.es

Tel.: 600 564 971','Escuela Universitaria de Enfermería y Fisioterapia San Juan de Dios - Comillas Campus Bormujos (Bormujos, Sevilla)'=>'Escuela Universitaria de Enfermería y Fisioterapia San Juan de Dios - Comillas Campus Bormujos (Bormujos, Sevilla)','Escuela Universitaria de Enfermería y Fisioterapia San Juan de Dios - Comillas Campus Ciempozuelos (Madrid)'=>'Escuela Universitaria de Enfermería y Fisioterapia San Juan de Dios - Comillas Campus Ciempozuelos (Madrid)','Fundació Bayt Al-Thaqafa (Barcelona)'=>'Fundació Bayt Al-Thaqafa (Barcelona)','Fundació Germà Benito Benni (Sant Boi de Llobregat, Barcelona, y Almacelles, Lleida)'=>'Fundació Germà Benito Benni (Sant Boi de Llobregat, Barcelona, y Almacelles, Lleida)','Fundació Germà Tomàs Canet (Sant Boi de Llobregat, Manresa y Lleida)'=>'Fundació Germà Tomàs Canet (Sant Boi de Llobregat, Manresa y Lleida)','Fundació d\'Atenció a la Dependència (Barcelona)'=>'Fundació d\'Atenció a la Dependència (Barcelona)','Fundación Jesús Abandonado (Murcia)'=>'Fundación Jesús Abandonado (Murcia)','Fundación Juan Ciudad ONGD (Madrid)'=>'Fundación Juan Ciudad ONGD (Madrid)','Fundación Tutelar Padre Miguel García Blanco (Sevilla)'=>'Fundación Tutelar Padre Miguel García Blanco (Sevilla)','Fundación Tutelar SJD Bética (Ciempozuelos, Madrid)'=>'Fundación Tutelar SJD Bética (Ciempozuelos, Madrid)','Hogar San Juan de Dios (Granada)'=>'Hogar San Juan de Dios (Granada)','Hogar y Clínica San Rafael (Vigo) '=>'Hogar y Clínica San Rafael (Vigo) ','Hospital Fundación San José (Madrid)'=>'Hospital Fundación San José (Madrid)','Hospital San Juan Grande (Jerez de la Frontera, Cádiz) '=>'Hospital San Juan Grande (Jerez de la Frontera, Cádiz) ','Hospital San Juan de Dios (Arrasate-Mondragón, Guipúzcoa)'=>'Hospital San Juan de Dios (Arrasate-Mondragón, Guipúzcoa)','Hospital San Juan de Dios (Burgos)'=>'Hospital San Juan de Dios (Burgos)','Hospital San Juan de Dios (Córdoba)'=>'Hospital San Juan de Dios (Córdoba)','Hospital San Juan de Dios (León)'=>'Hospital San Juan de Dios (León)','Hospital San Juan de Dios (Pamplona)'=>'Hospital San Juan de Dios (Pamplona)','Hospital San Juan de Dios (San Sebastián)'=>'Hospital San Juan de Dios (San Sebastián)','Hospital San Juan de Dios (Santa Cruz de Tenerife)'=>'Hospital San Juan de Dios (Santa Cruz de Tenerife)','Hospital San Juan de Dios (Santurtzi, Vizcaya)'=>'Hospital San Juan de Dios (Santurtzi, Vizcaya)','Hospital San Juan de Dios (Sevilla)'=>'Hospital San Juan de Dios (Sevilla)','Hospital San Juan de Dios (Zaragoza)'=>'Hospital San Juan de Dios (Zaragoza)','Hospital San Juan de Dios del Aljarafe (Bormujos, Sevilla)'=>'Hospital San Juan de Dios del Aljarafe (Bormujos, Sevilla)','Hospital San Rafael (Granada)'=>'Hospital San Rafael (Granada)','Hospital Sant Joan de Déu (Barcelona)'=>'Hospital Sant Joan de Déu (Barcelona)','Hospital Sant Joan de Déu Palma – Inca (Mallorca) '=>'Hospital Sant Joan de Déu Palma – Inca (Mallorca) ','Hospital Santa Clotilde (Santander)'=>'Hospital Santa Clotilde (Santander)','Hospital Universitario San Rafael (Madrid)'=>'Hospital Universitario San Rafael (Madrid)','Obra Social San Juan de Dios (Madrid)'=>'Obra Social San Juan de Dios (Madrid)','Obra Social Sant Joan de Déu (Barcelona)'=>'Obra Social Sant Joan de Déu (Barcelona)','Parc Sanitari Sant Joan de Déu (Sant Boi de Llobregat, Barcelona) '=>'Parc Sanitari Sant Joan de Déu (Sant Boi de Llobregat, Barcelona) ','Residencia San Juan de Dios (Granada)'=>'Residencia San Juan de Dios (Granada)','Residencia San Juan de Dios (Madrid)'=>'Residencia San Juan de Dios (Madrid)','Residencia San Juan de Dios (Sevilla)'=>'Residencia San Juan de Dios (Sevilla)','Residencia San Juan de Dios - Obra Social (Madrid)'=>'Residencia San Juan de Dios - Obra Social (Madrid)','Residencia San Juan de Dios Antequera (Málaga)'=>'Residencia San Juan de Dios Antequera (Málaga)','Sanatorio Marítimo (Gijón) '=>'Sanatorio Marítimo (Gijón) ','Sant Joan de Déu Serveis Socials (Barcelona)'=>'Sant Joan de Déu Serveis Socials (Barcelona)','Sant Joan de Déu Serveis Socials (Mallorca)'=>'Sant Joan de Déu Serveis Socials (Mallorca)','Sant Joan de Déu Serveis Sociosanitaris (Esplugues de Llobregat) '=>'Sant Joan de Déu Serveis Sociosanitaris (Esplugues de Llobregat) ','Sant Joan de Déu Terres de Lleida (Lleida)'=>'Sant Joan de Déu Terres de Lleida (Lleida)','Sant Joan de Déu València'=>'Sant Joan de Déu València','Servicios Sociales San Juan de Dios (Sevilla)'=>'Servicios Sociales San Juan de Dios (Sevilla)','a02b0c51d62dabcceaaec16a4bc0e17f'=>'Fundación Tutelar SJD Bética (Ciempozuelos, Madrid)','a17017067ea91d11d4ef26e11fa60eb6'=>'<strong>Hospitalario</strong><br><br>Coordinadoras de Voluntariado SJD: María Ángeles Izquierdo y María Teresa Medina Duque<br><br>E-mail: mariaangeles.izquierdo@sjd.es / mariateresa.medina@sjd.es<br><br>Tel.: 673 911 659 / 663 768 042','a49ecdcdb9d7f3e054abc42362db6441'=>'<strong>Docencia</strong><br>Coordinadoras de Voluntariado SJD: Begoña Fernández y María Corvillo.<br><br>E-mail: begona.fernandez@sjd.es / maria.corvillo@sjd.es<br><br>Tel.: 674 369 907 / 673 143 818','a772cb17e0f4a15f87ee9ecab0aeb89d'=>'Residencia San Juan de Dios (Madrid)','a8836c25da35ef7f520ea2178602cbf2'=>'Sanatorio Marítimo (Gijón) ','ab5c01b3aa6758342ab28c4560db6112'=>'<strong>Social, Discapacidad, Salud mental</strong><br><br>Coordinadora de Voluntariado SJD: Silvia Torralba<br><br>E-mail: silvia.torralba@sjd.es<br><br>Tel.: 674 491 378','ad036da80c31498c363c50ce4baf41b7'=>'<strong>Discapacidad</strong><br>Coordinadora de Voluntariado SJD: Inés Riera<br><br>E-mail: ines.riera@sjd.es<br><br>Tel.: 663 701 176','ae4cfcab26060965790cda0cf69dd3fa'=>'Residencia San Juan de Dios (Sevilla)','b02217e32ff325be84d95f3fde516eb1'=>'Hospital San Juan de Dios (Zaragoza)','b145df88b8c3cd3884b5f7adacc2496b'=>'<strong>Immigración</strong><br><br>Coordinadora de Voluntariado: Anna Eguia<br><br>E-mail: anna.eguia@bayt-al-thaqafa.org<br><br>Tel.:686 662 732','b15e5faf4bb04df88221cd3eff1391ef'=>'Fundació d\'Atenció a la Dependència (Barcelona)','b374472353f98e313b2ac287f2489984'=>'<strong>Mayores</strong><br>Coordinadora de Voluntariado SJD: Lorena Meño<br><br>E-mail: utiii.programamayores@sjd.es<br><br>Tel.: 673 402 576','b56ec6af561c05794b405782b0c4947d'=>'Hospital San Juan de Dios (Arrasate-Mondragón, Guipúzcoa)','b912a582dc0d27e2cd286ab725693876'=>'<strong>Hospitalario, Cuidados Paliativos, Infancia y discapacidad</strong><br><br>Coordinadora de Voluntariado SJD: Sara Martín Blanco<br><br>E-mail: sara.martinb@sjd.es<br><br>Tel.: 673 135 532','b981f7e112df970336b7f79107830bbf'=>'<strong>Social, Mayores, Discapacidad, Salud mental</strong><br><br>Coordinadora de Voluntariado SJD: Marta Anfruns<br><br>E-mail: marta.anfruns@sjd.es<br><br>Tel.: 93 365 29 65','bb2948572d4bd766d8ecce338d33bb4b'=>'<strong>Discapacidad, servicios sociales</strong><br><br>Coordinador de Voluntariado SJD: Miguel Collantes<br><br>E-mail: miguel.collantes@sjd.es<br><br>Tel.: 663 984 701','bbdceab6608a4e583cc9f0c5cfcccef0'=>'Hospital San Juan de Dios (Pamplona)','bc9dd295d190bb3e8bf3b20725a80bc3'=>'<strong>Hospitalario, mayores, soledad no deseada</strong><br><br>Coordinadora de Obra Social: Patricia Castany<br><br>E-mail: patricia.castany@sjd.es<br><br>Tel: 673 34 12 05<br><br>Coordinadora de Voluntariado SJD Programa Soledad no deseada: Darling Montoya<br><br>E-mail: darling.montoya@sjd.es<br><br>Tel.: 607 564 452','c7b0bb47da18aedee01537d39181a6b4'=>'<strong>Captación de fondos, sensibilización, comunicación y proyectos</strong><br><br>Coordinador de Voluntariado SJD: Xavier Ticó Ferrer<br><br>E-mail: xavier.tico@sjd.es<br><br>Tel.: 932 532 136 (ext. 140) / 661 770 017','c80b9e9face13675b27fb4a940494331'=>'Hospital Sant Joan de Déu (Barcelona)','ca55ab5f794b270a5c876203f453e115'=>'Hospital San Juan de Dios (Santurtzi, Vizcaya)','cba11232b5fc5a03999d4564c12fc784'=>'Hospital San Juan de Dios (Sevilla)','cba4527e5510f983f0355eee2c4b101c'=>'<strong>Personas mayores</strong><br><br>Coordinadora de Voluntariado SJD: María Isabel Ramírez López<br><br>E-mail: isabel.ramirez@sjd.es<br><br>Tel.: 958 227 449','ce11a460e554506d88a581b2a0332a2f'=>'Ciudad San Juan de Dios Alcalá de Guadaíra (Sevilla) ','ceaaf064d53e4621ec950cfff66a7693'=>'<input style="width:95%; padding:0.75rem; border:1px solid #007FAD; border-radius:5px;" type="text" onkeyup="filter(this)" placeholder="Paraula a cercar"/>

<script>
    function normalizeSearch(text) {
        return text
            .toLowerCase()
            .normalize(\'NFD\')
            .replace(/[\\u0300-\\u036f]/g, \'\');
    }

    function filter(element) {
        var value = normalizeSearch(jQuery(element).val());

        jQuery(".post-list > li").each(function () {
            var text = normalizeSearch(jQuery(this).text());

            if (text.indexOf(value) > -1) {
                jQuery(this).show();
            } else {
                jQuery(this).hide();
            }
        });
    }
</script>','d1f90efdca4db4c52da0b506e7d9fe8a'=>'Residencia San Juan de Dios (Granada)','d61c17deb53f66c02af6a8ac25b6446a'=>'<strong>Hospitalario</strong><br><br>Coordinadora de Voluntariado SJD: Laura Abril Albalá<br><br>E-mail: laura.abrila@sjd.es<br><br>Tel.:  987 23 25 00<br>987 23 23 00 (Ext 710)<br>671 09 72 17','d6a988d8dc6226c189d1b0f45fa9b554'=>'Fundació Germà Tomàs Canet (Sant Boi de Llobregat, Manresa y Lleida)','d7b3fa420ad9e045125459da9bbb779b'=>'<strong>Salud mental, dependencia, hospitalario, social </strong><br><br>Coordinadora de Voluntariado SJD: Núria Farre<br><br>E-mail: nuria.farrec@sjd.es<br><br>Telf.: 667 156 817','dd1bab54bf29bf30674c23023c7c12ef'=>'<strong>Hospitalario</strong><br><br>Coordinadora de Voluntariado SJD: María Isabel de la Rosa Pérez<br><br>E-mail: maria.isabel.delarosa @sjd.es<br><br>Tel.: 617 020 080','dd340c7002d53630d0260bec9c980531'=>'<strong>Discapacidad</strong><br><br>Coordinador de Voluntariado SJD: Santiago Ablanedo Mingot<br><br>E-mail: santiago.ablanedo@sjd.es<br><br>Telf.: 985 362 311','dd76e5ff606010b49bceb6a50d4ed1ed'=>'Hospital San Juan de Dios (Santa Cruz de Tenerife)','de1cda017243b17e307a987dce3c2fc3'=>'Clínica Nuestra Señora de La Paz (Madrid)','e612c96580bcfedecac3c0a8e83836ea'=>'<strong>Personas sin hogar</strong><br><br>Coordinadora de Voluntariado SJD: Fàtima Tortosa<br><br>E-mail: fatima.tortosa@sjd.es<br><br>Telf.: 607 59 21 57 /  96 366 50 70','e9f665a4d0d9c2f34e5d1b103ca3a5ee'=>'Hospital Sant Joan de Déu Palma – Inca (Mallorca) ','ed9658f0fed3da3d314cadd11ea21aee'=>'<strong>Cooperación internacional</strong><br>Coordinadora de Voluntariado SJD: M.ª de los Ángeles Lobo<br><br>E-mail: juanciudad.voluntariado@sjd.es<br><br>Tel.: 617 935 143','ef32c46fdd54b7fd5c9bfd5fec5b5227'=>'Sant Joan de Déu Serveis Socials (Barcelona)','f09e616dc6e8074dcbe45f0fcd897f84'=>'Escuela Universitaria de Enfermería y Fisioterapia San Juan de Dios - Comillas Campus Ciempozuelos (Madrid)','f3bdf1921b06398b00e94c9be479331f'=>'Parc Sanitari Sant Joan de Déu (Sant Boi de Llobregat, Barcelona) ','f4f3f5eefdbb4be75e565da6bfc8aac2'=>'Fundación Jesús Abandonado (Murcia)','f6a2cdf0ede554abeef37dee6ad7bd2e'=>'Hospital Santa Clotilde (Santander)','f968e6cdcbc66d6adf5372b365a05bae'=>'<strong>Social, salud mental, mayores, </strong><br><br>Coordinadora de Voluntariado SJD: Rosaura Julián<br><br>E-mail: rosaura.julian@sjd.es<br><br>Tel.: 637 102 855']];
