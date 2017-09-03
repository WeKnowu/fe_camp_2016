function updateMysql(id, from, to) {
	$.ajax({
		url: '/home/index/update',
		type: 'POST',
		dateType: 'json',
		data: {
			from: from,
			to: to,
			id: id
		},
		successs: res => {
			if (!res.errno) {
				window.location.reload();
			} else alert(res.errmsg);
		}

	});
}

function update(id, value) {
	if (value) {
		var item1 = $("#todo-" + id);
		var donelist = $("#donelist");
		var temp1 = item1.parent();
		temp1.children("input").attr("onchange", "update(" + id + ", false)");
		temp1.children("input").attr("checked", "checked");
		temp1.children("p").attr("id", "done-" + id);
		temp1.children("a").attr("href", "javascript:remove(" + id + ", false)");
		donelist.append("<li>" + temp1.html() + "</li>");
		item1.parent().remove();
		var todocount = $("#todocount");
		var donecount = $("#donecount");
		todocount.text(parseInt(todocount.text()) - 1);
		donecount.text(parseInt(donecount.text()) + 1);
		updateMysql(id, "todo", "done");
	} else {
		var item2 = $("#done-" + id);
		var todolist = $("#todolist");
		var temp2 = item2.parent();
		temp2.children("input").attr("onchange", "update(" + id + ", true)");
		temp2.children("input").attr("checked", null);
		temp2.children("p").attr("id", "todo-" + id);
		temp2.children("a").attr("href", "javascript:remove(" + id + ", true)");
		todolist.append("<li>" + temp2.html() + "</li>");
		item2.parent().remove();
		var todocount = $("#todocount");
		var donecount = $("#donecount");
		todocount.text(parseInt(todocount.text()) + 1);
		donecount.text(parseInt(donecount.text()) - 1);
		updateMysql(id, "done", "todo");
	}
}

function remove(id, value) {
	if (value) {
		var item1 = $("#todo-" + id);
		item1.parent().remove();
		var todocount = $("#todocount");
		todocount.text(parseInt(todocount.text()) - 1);
	} else {
		var item2 = $("#done-" + id);
		item2.parent().remove();
		var donecount = $("#donecount");
		donecount.text(parseInt(donecount.text()) - 1);
	}
	$.ajax({
		url: '/home/index/remove',
		type: 'POST',
		dateType: 'json',
		data: {
			list: value ? "todo" : "done",
			id: id
		},
		successs: res => {
			if (!res.errno) {
				window.location.reload();
			} else alert(res.errmsg);
		}
	});
}