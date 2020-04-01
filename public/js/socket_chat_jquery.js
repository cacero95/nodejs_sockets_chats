var params = new URLSearchParams(window.location.search);
// functions for render jquery properties

// jquery references
var div_usuarios = $('#divUsuarios');

function render_people(people) {
    var html = '';
    html += `
    <li>
        <a href="javascript:void(0)" class="active"> Chat de <span> ${params.get('room')}</span></a>
    </li>`
    for (var person of people) {
        html += `
        <li>
            <a data-id="${person.id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${person.name} <small class="text-success">online</small></span></a>
        </li>
        `
    }
    div_usuarios.html(html);
}