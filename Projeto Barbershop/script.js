document.addEventListener('DOMContentLoaded', () => {
    // Carrossel de Fotos
    let currentIndex = 0;
    const images = document.querySelectorAll('.gallery-carousel img');
    const totalImages = images.length;

    function showImage(index) {
        images.forEach((img, i) => {
            img.style.display = (i === index) ? 'block' : 'none';
        });
    }

    showImage(currentIndex);

    document.querySelector('.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    });

    document.querySelector('.prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
    });

    document.querySelector('.view-all').addEventListener('click', () => {
        alert('Abrir galeria completa');
    });

    // Mapa
    const mapOptions = {
        zoom: 15,
        center: { lat: -23.5505, lng: -46.6333 }
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    const marker = new google.maps.Marker({
        position: mapOptions.center,
        map: map
    });
});


// Seleciona o modal, as imagens e o botão de fechar
var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("caption");
var closeBtn = document.getElementsByClassName("close")[0];

// Adiciona evento de clique para abrir o modal
document.querySelectorAll('.gallery-carousel img').forEach(img => {
    img.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }
});

// Adiciona evento de clique para fechar o modal
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Fecha o modal quando o usuário clica fora da imagem
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

    document.addEventListener("DOMContentLoaded", function() {
        const horarioSelect = document.getElementById("horario-agendamento");
        const dataInput = document.getElementById("data-agendamento");

        // Função para gerar horários disponíveis com base no dia da semana
        function atualizarHorarios() {
            const data = new Date(dataInput.value);
            const diaSemana = data.getDay(); // 0 - Domingo, 1 - Segunda, ..., 6 - Sábado

            horarioSelect.innerHTML = ""; // Limpar horários antigos

            if (diaSemana === 0 || diaSemana === 1) {
                // Segunda e Domingo: Fechado
                const option = document.createElement("option");
                option.value = "fechado";
                option.textContent = "Fechado";
                horarioSelect.appendChild(option);
                horarioSelect.disabled = true; // Desativar seleção de horários
            } else {
                horarioSelect.disabled = false; // Ativar seleção de horários
                let horariosDisponiveis = [];

                if (diaSemana >= 2 && diaSemana <= 4) {
                    // Terça a Quinta: 10:00 - 19:00 (Almoço 13:00 - 15:00)
                    horariosDisponiveis = gerarHorariosDisponiveis(10, 19);
                } else if (diaSemana === 5) {
                    // Sexta: 9:00 - 20:00 (Almoço 13:00 - 15:00)
                    horariosDisponiveis = gerarHorariosDisponiveis(9, 20);
                } else if (diaSemana === 6) {
                    // Sábado: 9:00 - 18:00 (Almoço 13:00 - 15:00)
                    horariosDisponiveis = gerarHorariosDisponiveis(9, 18);
                }

                // Remover horário de almoço (13:00 - 15:00)
                horariosDisponiveis = horariosDisponiveis.filter(h => h < 13 || h >= 15);

                // Popular o select com os horários disponíveis
                horariosDisponiveis.forEach(horario => {
                    const option = document.createElement("option");
                    option.value = `${horario}:00`;
                    option.textContent = `${horario}:00`;
                    horarioSelect.appendChild(option);
                });
            }
        }

        // Função para gerar uma lista de horários disponíveis
        function gerarHorariosDisponiveis(inicio, fim) {
            let horarios = [];
            for (let i = inicio; i <= fim; i++) {
                horarios.push(i);
            }
            return horarios;
        }

        // Atualizar horários sempre que a data for alterada
        dataInput.addEventListener("change", atualizarHorarios);
    });

    document.addEventListener("DOMContentLoaded", function() {
        const calendarEl = document.getElementById('calendar');
        const dataInput = document.getElementById("data-agendamento");
    
        // Inicializa o Evo Calendar
        $(calendarEl).evoCalendar({
            format: 'dd/mm/yyyy',
            todayHighlight: true,
            onSelectDate: function(date) {
                // Preenche o campo de data do formulário com a data selecionada
                dataInput.value = date.format('yyyy-mm-dd');
                atualizarHorarios(); // Atualiza os horários disponíveis
            }
        });
    
        // Atualiza os horários disponíveis com base na data
        function atualizarHorarios() {
            const data = new Date(dataInput.value);
            const diaSemana = data.getDay(); // 0 - Domingo, 1 - Segunda, ..., 6 - Sábado
    
            horarioSelect.innerHTML = ""; // Limpar horários antigos
    
            if (diaSemana === 0 || diaSemana === 1) {
                // Segunda e Domingo: Fechado
                const option = document.createElement("option");
                option.value = "fechado";
                option.textContent = "Fechado";
                horarioSelect.appendChild(option);
                horarioSelect.disabled = true; // Desativar seleção de horários
            } else {
                horarioSelect.disabled = false; // Ativar seleção de horários
                let horariosDisponiveis = [];
    
                if (diaSemana >= 2 && diaSemana <= 4) {
                    // Terça a Quinta: 10:00 - 19:00 (Almoço 13:00 - 15:00)
                    horariosDisponiveis = gerarHorariosDisponiveis(10, 19);
                } else if (diaSemana === 5) {
                    // Sexta: 9:00 - 20:00 (Almoço 13:00 - 15:00)
                    horariosDisponiveis = gerarHorariosDisponiveis(9, 20);
                } else if (diaSemana === 6) {
                    // Sábado: 9:00 - 18:00 (Almoço 13:00 - 15:00)
                    horariosDisponiveis = gerarHorariosDisponiveis(9, 18);
                }
    
                // Remover horário de almoço
                horariosDisponiveis = horariosDisponiveis.filter(h => h < 13 || h >= 15);
    
                // Popular o select com os horários disponíveis
                horariosDisponiveis.forEach(horario => {
                    const option = document.createElement("option");
                    option.value = `${horario}:00`;
                    option.textContent = `${horario}:00`;
                    horarioSelect.appendChild(option);
                });
            }
        }
    
        // Função para gerar uma lista de horários disponíveis
        function gerarHorariosDisponiveis(inicio, fim) {
            let horarios = [];
            for (let i = inicio; i <= fim; i++) {
                horarios.push(i);
            }
            return horarios;
        }
    });
    
   



