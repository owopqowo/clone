(() => {

	let yOffset = 0; // window.pageYOffset
	let prevScrollHeight = 0; // yOffset보다 이전에 위치한 섹션 높이 합
	let currentScene = 0; // 현재 활성화된 scene
	let enterNewScene = false; // 새로운 scene이 시작되는 순간 true

	const sceneInfo = [
		{
			type: 'sticky',
			heightNum: 5, // 브라우저 높이의 5배로 scrollHeihgt setting
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-0'),
				message0: document.querySelector('#scroll-section-0 .main-message[data-num="0"]'),
				message1: document.querySelector('#scroll-section-0 .main-message[data-num="1"]'),
				message2: document.querySelector('#scroll-section-0 .main-message[data-num="2"]'),
				message3: document.querySelector('#scroll-section-0 .main-message[data-num="3"]'),
			},
			val: {
				message0_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
				message0_opacity_out: [1, 0, { start: 0.25, end: 0.35 }],
				message0_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
				message0_translateY_out: [0, -20, { start: 0.25, end: 0.35 }],
				message1_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
			}
		},
		{
			type: 'normal',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-1'),
			},
		},
		{
			type: 'sticky',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-2'),
			},
		},
		{
			type: 'sticky',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-3'),
			},
		}
	];

	function setLayout() {
		for (let i = 0; i < sceneInfo.length; i++) {
			if(sceneInfo[i].type === 'sticky') {
				sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
				sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
			}
		}

		yOffset = window.pageYOffset;
		let totalScrollHeight = 0;
		for (let i = 0; i < sceneInfo.length; i++) {
			totalScrollHeight += sceneInfo[i].scrollHeight;
			if (totalScrollHeight >= yOffset) {
				currentScene = i;
				break;
			}
		}
		document.body.setAttribute('id', `show-scene-${currentScene}`);
	}

	function calcVal(val, currentYOffset) {
		let rv;
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / scrollHeight; // %값

		if (val.length >= 3) {
			const partScrollStart = val[2].start * scrollHeight; // 시작값 px
			const partScrollEnd = val[2].end * scrollHeight; // 종료값 px
			const partScrollHeight = partScrollEnd - partScrollStart; // 애니메이션 구간

			if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
				rv = (currentYOffset - partScrollStart) / partScrollHeight * (val[1] - val[0]) + val[0];
			} else if (currentYOffset < partScrollStart) {
				rv = val[0];
			} else if (currentYOffset > partScrollEnd) {
				rv = val[1];
			}
		} else {
			rv = scrollRatio * (val[1] - val[0]) + val[0];
		}
		
		return rv;
	}

	function playAni() {
		const objs = sceneInfo[currentScene].objs;
		const val = sceneInfo[currentScene].val;
		const currentYOffset = yOffset - prevScrollHeight;
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / scrollHeight;

		switch (currentScene) {
			case 0:
				const middleVal = ((val.message0_opacity_out[2].start - val.message0_opacity_in[2].end) / 2) + val.message0_opacity_in[2].end;
				if (scrollRatio <= middleVal) {
					objs.message0.style.opacity = calcVal(val.message0_opacity_in, currentYOffset);
					objs.message0.style.transform = `translateY(${calcVal(val.message0_translateY_in, currentYOffset)}%)`;
				} else {
					objs.message0.style.opacity = calcVal(val.message0_opacity_out, currentYOffset);
					objs.message0.style.transform = `translateY(${calcVal(val.message0_translateY_out, currentYOffset)}%)`;
				}
				break;
			case 1:
			
				break;
			case 2:
			
				break;
			case 3:
			
				break;
		}
	}

	function scrollLoop() {
		enterNewScene = false;
		prevScrollHeight = 0;
		for (let i = 0; i < currentScene; i++) {
			prevScrollHeight += sceneInfo[i].scrollHeight;
		}
		if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
			enterNewScene = true;
			currentScene++;
			document.body.setAttribute('id', `show-scene-${currentScene}`);
		}
		if(yOffset < prevScrollHeight) {
			enterNewScene = true;
			if (currentScene === 0) return;
			currentScene--;
			document.body.setAttribute('id', `show-scene-${currentScene}`);
		}
		if(enterNewScene) return;
		playAni();
		
	}

	window.addEventListener('scroll', () => {
		yOffset = window.pageYOffset;
		scrollLoop();
	});

	window.addEventListener('load', setLayout)
	window.addEventListener('resize', setLayout);

})();