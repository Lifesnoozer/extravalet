(function($) {
	'use strict';

	var _body = $('body');
	var _qWrapper = $('.question');

	var current = -1;

	var parties = {
		kd: {
			name: 'Kristdemokraterna',
			class: 'borgare',
			reason: '<p>Du gillar troligtvis gud, det vill säga den kristna guden.<br>Alliansen är din enda chans till att någonsin se riksdagen.</p><p>Du är också med 89% säkerhet smygbög.</p>',
			punchline: 'Eller så gillar du verkligen Göran Hägglunds frisyr.',
			website: 'http://kristdemokraterna.se',
		},
		fp: {
			name: 'Folkpartiet',
			class: 'borgare',
			reason: '<p>Du gick inte ur gymnasiet, eller så är du militär, och får ståfräs av Jan Björklund.</p><p>Matematik är extremt viktigt, men inga andra ämnen.</p><p>Du behöver troligtvis extrema mängder tandvård.</p>',
			punchline: 'Seriöst, man kan skjuta en pinigsboll mellan Jans tänder.',
			website: 'http://folkpartiet.se',
		},
		m: {
			name: 'Moderaterna',
			class: 'borgare',
			reason: '<p>Jobb jobb jobb jobb, jobb jobb jobb. Jobb jobb.</p><p>Jobblinjen.</p>',
			punchline: '"Död åt dödsknarkarna" - Beatrice Ask',
			website: 'http://moderat.se',
		},
		c: {
			name: 'Centerpartiet',
			class: 'borgare',
			reason: '<p>Troligvis bor du på landsbygden, och tror av någon anledning att Centerpartiet är ett landsbygdsparti.</p><p>Du vet också att du har fel, men vill inte erkänna det.</p>',
			punchline: 'Så du fortsätter rösta centerpartiet.',
			website: 'http://centerpartiet.se',
		},
		v: {
			name: 'Vänsterpartiet',
			class: 'sosse',
			reason: '<p>Du är kommunist.</p><p>Är du över 35 knarkade du extremt mycket i din ungdom, men vill inte erkänna det nu.</p>',
			punchline: 'Precis som Jonas Sjöstedt.',
			website: 'http://vansterpartiet.se',
		},
		mp: {
			name: 'Miljöpartiet',
			class: 'sosse-fast-gron',
			reason: '<p>Du lider av beslutsångest, och väljer därför det enda partiet som inte kan välja <strong>en</strong> partiledare.</p><p>Du bor på södermalm.</p>',
			punchline: 'Gå och raka av skägget, november är slut.',
			website: 'http://miljopartiet.se',
		},
		s: {
			name: 'Socialdemokraterna',
			class: 'sosse',
			reason: '<p>Du arbetar i fabrik, eller har alltid röstat på Socialdemokraterna.</p><p>Egentligen bryr du dig inte om politik.</p>',
			punchline: 'Du tror däremot att du gör det.',
			website: 'http://socialdemokraterna.se',
		},
		fi: {
			name: 'Feministiskt initiativ',
			class: 'feminazi',
			reason: '<p>Det är coolt att rösta på ett coolt parti.</p><p>Du är trans*, ung och arg tjej, eller så vill du bara ligga med en.</p><p>Du blir arg av allt som står på internet.</p>',
			punchline: 'Troligtvis blev du förolämpad av den här texten.',
			website: 'http://feministisktinitiativ.se',
		},
		sd: {
			name: 'Sverigedemokraterna',
			class: 'riktignazi',
			reason: '<p>Du är rasist, nazist, fascist, eller alla tre.</p><p>Du hatar invandrare, men säger att det är falskt för du har en kompis som är invandrare.</p>',
			punchline: 'Du hatar också bögar, kvinnor, övriga partier, samt allt som är svenskt.',
			website: 'http://sverigedemokraterna.se',
		},
		pp: {
			name: 'Piratpartiet',
			class: 'yarr',
			reason: '<p>Du önskar att du vore en kämpe för ett öppet internet.</p><p>Men egentligen vill du bara ladda ner Game of Thrones utan att betala.</p>',
			punchline: 'Du borde duscha.',
			website: 'http://piratpartiet.se',
		},
	};

	var questions = [
		{
			question: 'Extravalet 2015 - Vad ska jag rösta på?',
			options: [
				'Hjälp mig!',
				'Jag vet redan, tack ändå.',
			],
			right: -1,
		},
		{
			question: 'Prisad vare...',
			options: [
				'... Gud',
				'... Kebab',
				'... Satan',
				'Inget av ovanstående.'
			],
			right: 0,
			party: parties.kd
		},
		{
			question: 'Heil',
			options: [
				'Hitler!',
				'Näää va?'
			],
			right: 0,
			party: parties.sd
		},
		{
			question: 'Vilken linje ser bäst ut?',
			options: [
				'——————',
				'Jobb',
				'/\\/\\/\\/\\/'
			],
			right: 1,
			party: parties.m
		},
		{
			question: 'Vems fel är det?',
			options: [
				'Vårt, vi bättrar oss.',
				'Svenska folkets.',
				'Alliansens.'
			],
			right: 2,
			party: parties.s
		},
		{
			question: 'Påstående: Jag betalar för HBO Nordic',
			options: [
				'Sant',
				'Falskt'
			],
			right: 1,
			party: parties.pp
		},
		{
			question: 'Du har en bulle, vad gör du?',
			options: [
				'Delar den med alla.',
				'Äter upp den.',
				'Jag är glutenallergiker.'
			],
			right: 0,
			party: parties.v
		},
		{
			question: 'Vad är 3+2?',
			options: [
				'4',
				'Vet inte, jag gick inte ut skolan',
				'5',
				'32'
			],
			right: 3,
			party: parties.fp
		},
		{
			question: 'Sveriges största problem är...',
			options: [
				'Fallande skolresultat.',
				'Fattigdom.',
				'Hotet från Ryssland.',
				'Vita män.'
			],
			right: 3,
			party: parties.fi
		},
		{
			question: 'Det enda som räknas är...',
			options: [
				'Pengar.',
				'Kärlek.',
				'Södermalm.'
			],
			right: 2,
			party: parties.mp
		},
		{
			question: 'Center eller Plopp?',
			options: [
				'Center.',
				'Plopp.',
			],
			right: 0,
			party: parties.c
		}
	];

	var max = questions.length - 1;

	var finish = function(party) {
		_qWrapper.html('');
		_body.removeClass('quiz');
		_body.addClass('result');
		_body.addClass(party.class);
		_qWrapper.append('<h1 class="title">Du borde rösta på <a target="_blank" href="' + party.website + '">' + party.name + '</a></h1>');
		_qWrapper.append('<div class="reasoning">' + party.reason + '</div>');
		_qWrapper.append('<div class="punchline">(' + party.punchline + ')</div>');
	};

	var next = function() {
		_qWrapper.html('');

		current++;

		console.log(current, max);
		if (current - 1 === max) {
			showBlank();
			return;
		}

		_qWrapper.append('<h1 class="title">' + questions[current].question + '</h1>');

		var a = '';

		for (var i = 0; i < questions[current].options.length; i++) {
			a += '<li class="answer" data-index="' + i + '">' + questions[current].options[i] + '</li>';
		}

		_qWrapper.append('<ol>' + a + '</ol>');
	};

	var showBlank = function() {
		_qWrapper.html('');
		_body.removeClass('quiz');
		_body.addClass('result');
		_body.addClass('borgare');
		_qWrapper.append('<h1 class="title">Du borde rösta blankt.</h1>');
		_qWrapper.append('<div class="reasoning"><p>Fegis.</p></div>');
		_qWrapper.append('<div class="punchline">(Det är sådana som du som förstör Sverige.)</div>');
	};

	var checkAnswer = function() {
		if (parseInt($(this).data('index'), 10) !== parseInt(questions[current].right, 10)) {
			if (parseInt(questions[current].right, 10) === -1 && parseInt($(this).data('index'), 10) !== 0) {
				showBlank();
				return;
			}

			next();
		} else {
			finish(questions[current].party);
		}
	};

	_body.on('click', '.answer', checkAnswer);
	next();
})(jQuery);