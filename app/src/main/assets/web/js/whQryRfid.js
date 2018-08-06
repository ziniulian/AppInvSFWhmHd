function init() {}

rfid.hdScan = function (arr) {
	var t, o;
	for (var i = 0; i < arr.length; i ++) {
		t = arr[i].tid;
		o = JSON.parse(qr.getTag(t));
		if (o !== null) {
			dat.setTid(t);
			dat.flushUI(o);
			rfid.scanStop();
			break;
		}
	}
};

dat = {
	tid: "",		// TID

	// 设置TID
	setTid: function (s) {
		if (s && dat.tid !== s) {
			dat.tid = s;
		}
	},

	// 设置批次号
	setBn: function (s) {
		if (s && s.indexOf("AUTO") !== 0) {
			sbnDom.innerHTML = s;
		} else {
			sbnDom.innerHTML = "";
		}
	},

	// 刷新页面
	flushUI: function (o) {
		if (o) {
			switch(o.typ) {
				case "M":
					sidDom.innerHTML = o.cod;
					snamDom.innerHTML = o.nam;
					spartDom.innerHTML = o.PartSort;
					smfCodDom.innerHTML = o.codF;
					dat.setBn(o.bn);
					snumDom.innerHTML = o.num;
					sloDom.innerHTML = o.codL;
					soutDom.className = "in_out";
					loutDom.className = "in_out Lc_nosee";
					dat.show();
					break;
				case "L":
					lidDom.innerHTML = o.cod;
					dat.show(true);
					break;
			}
		} else {
			dat.clearUI();
			tools.memo("不可识别的信息！");
		}
	},

	// 显示库位信息
	show: function (b) {
		if (b) {
			soutDom.className = "in_out Lc_nosee";
			loutDom.className = "in_out";
		} else {
			soutDom.className = "in_out";
			loutDom.className = "in_out Lc_nosee";
		}
	},

	// 清空页面
	clearUI: function () {
		sidDom.innerHTML = "";
		snamDom.innerHTML = "";
		spartDom.innerHTML = "";
		smfCodDom.innerHTML = "";
		dat.setBn("");
		snumDom.innerHTML = "";
		sloDom.innerHTML = "";
		dat.tid = "";
		dat.show();
	},

	back: function () {
		window.history.back();
	}
};