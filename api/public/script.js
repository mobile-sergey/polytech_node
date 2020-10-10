// Получение пользователей
function GetUsers() {
  $.ajax({
    url: "/api/v1/users",
    type: "GET",
    contentType: "application/json",
    success: (users) => {
      var rows = "";
      $.each(users, (index, user) {
        rows += row(user);
      })
      $("table tbody").append(rows);
    }
  });
}

// Получение одного пользователя
function GetUser(id) {
  $.ajax({
    url: "/api/v1/users" + id,
    type: "GET",
    contentType: "application/json",
    success: (user) {
      var form = document.forms["user"];
      form.elements["id"].value = user.id;
      form.elements["name"].value = user.name;
      form.elements["age"].value = user.age;
    }
  })
}

// Добавление пользователя
function CreateUser(name, age) {
  $.ajax({
    url: "/api/v1/users",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      name: name,
      age: age
    }),
    success: (user) {
      reset();
      $("table tbody").append(row(user));
    }
  })
}

// Изменение пользователя
function EditUser(id, name, age) {
  $.ajax({
    url: "/api/v1/users",
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify({
      id: id,
      name: name,
      age: age
    }),
    success: (user) {
      reset();
      $("tr[data-rowid='" + user.id + "']").replaceWith(row(user));
    }
  })
}

// Удаление пользователя
function DeleteUser(id) {
  $.ajax({
    url: "/api/v1/users" + id,
    type: "DELETE",
    contentType: "application/json",
    success: (user) {
      console.log(user)
      $("tr[data-rowid='" + user.id + "']").remove();
    }
  })
}

// Сброс формы
function reset() {
  var form = document.forms["user"];
  form.reset();
  form.elements["id"].value = 0;
}
