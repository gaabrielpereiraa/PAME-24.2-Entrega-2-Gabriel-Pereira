class Reserva{
    constructor(id, id_cliente, status, checkin, checkout, quarto, avaliada){
        this.id = id;
        this.id_cliente = id_cliente;
        this.status = status;
        this.checkin = checkin;
        this.checkout = checkout;
        this.quarto = quarto;
        this.avaliada = avaliada;
    }
}

class Funcionario{
    constructor(id, username, cpf, email, senha){
        this.id = id;
        this.username = username;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}

class Cliente{
    constructor(id, nome, data, cpf, email, senha){
        this.id = id;
        this.nome = nome
        this.data = data;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}

class Quarto{
    constructor(camas, precopornoite, nome, descricao){
        this.camas = camas;
        this.precopornoite = precopornoite;
        this.nome = nome;
        this.descricao = descricao;
    }
}

class Avaliacao{
    constructor(nota, texto, id, quarto){
        this.nota = nota;
        this.texto = texto;
        this.id = id;
        this.quarto = quarto;
    }
}

class Sistema{
    constructor(){
        //Mostrar a tela inicial do programa, dando 3 opcões para o usuário
        console.log("Bem Vindo(a) ao Hotel F-Luxo!")
        console.log("1.Fazer Login");
        console.log("2.Fazer Cadastro");
        console.log("3.Sair do Programa");
        var requisicao = require('readline-sync');
        var entrada = requisicao.question("Escolha uma opcao: ")
        switch(entrada){
            case "0":
                console.log(sep);
                console.log("Essa opção não é válida!");
                console.log(sep);
                new Sistema();
                break;
            case "1":
                console.clear();
                this.login();
                break;
            case "2":
                console.clear();
                this.cadastro();
                break;
            case "3":
                return;
            default:
                console.log(sep);
                console.log("Essa opção não é válida!");
                console.log(sep);
                new Sistema();
                break;
        }
    }
    //Funcão para checar se o email é válido
    ask_email(){
        var requisicao = require('readline-sync');
        let e_mail = requisicao.question("Entre o seu email: ");
        for (let i = 0; i < clientes.length; i++){
            if (clientes[i].email == e_mail){
                console.log("Email já cadastrado!");
                console.log(sep);
                return this.ask_email();
            }
        }
        if (e_mail.includes('@') && e_mail.includes('.')){
            return e_mail;
        }
        else{
            console.log("Email inválido!");
            console.log(sep);
            return this.ask_email();
        }
    }
    //Funcão para checar se a data de nascimento é válida
    ask_date(){
        var requisicao = require('readline-sync');
        let date = requisicao.question("Entre a sua data de nascimento (YYYY-MM-DD): ");
        let separated = date.split('-');
        if (separated.length != 3){
            console.log("Data inválida!");
            console.log(sep);
            return this.ask_date();
        }
        for (let i = 0; i < 3; i++){
            if (isNaN(separated[i])){
                console.log("Data inválida!");
                console.log(sep);
                return this.ask_date();
            }
        }
        if (separated[0].length != 4 || separated[1].length != 2 || separated[2].length != 2 || Number(separated[0]) > 2025 || Number(separated[0]) <= 1910 || Number(separated[1]) > 12 || Number(separated[1]) < 1 || Number(separated[2]) > 31 || Number(separated[2]) < 1){
            console.log("Data inválida!");
            console.log(sep);
            return this.ask_date();
        }
        const date_n = new Date(date);
        if (isNaN(date_n.getTime())){
            console.log("Data inválida!");
            console.log(sep);
            return this.ask_date();
        }
        return date;
    }
    //Função para checar se o CPF é válido
    ask_cpf() {
        var requisicao = require('readline-sync');
        let cpf = requisicao.question("Entre o seu CPF (somente números): ");
        if (cpf == "00000000000" || cpf.length != 11 || isNaN(cpf) || cpf.split('').every(char => char === cpf[0])) {
            console.log("CPF inválido!");
            console.log(sep);
            return this.ask_cpf();
        }
        let soma = 0;
        let resto;

        // Verifica o primeiro dígito verificador
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }

        resto = (soma * 10) % 11;

        if ((resto === 10) || (resto === 11)) {
            resto = 0;
        }

        if (resto !== parseInt(cpf.substring(9, 10))) {
            console.log("CPF inválido!");
            console.log(sep);
            return this.ask_cpf();
        }

        soma = 0;

        // Verifica o segundo dígito verificador
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }

        resto = (soma * 10) % 11;

        if ((resto === 10) || (resto === 11)) {
            resto = 0;
        }

        if (resto !== parseInt(cpf.substring(10, 11))) {
            console.log("CPF inválido!");
            console.log(sep);
            return this.ask_cpf();
        }
        return cpf;
    }

    //Função para checar se o preço é válido
    ask_price(){
        var requisicao = require('readline-sync');
        let price = requisicao.question("Digite o preco por noite do quarto: ");
        if (isNaN(price)){
            console.log("Preço Inválido!");
            console.log(sep);
            return this.ask_price();
        }
        else{
            return price;
        }
    }

    //Função para checar se a quantidade de camas é válida
    ask_beds(){
        var requisicao = require('readline-sync');
        let camas = (requisicao.question("Digite a quantidade de camas no quarto: "));
        if (isNaN(camas) || !Number.isInteger(Number(camas))){
            console.log("Quantidade inválida!");
            console.log(sep);
            return this.ask_beds();
        }
        else{
            return Number(camas);
        }
    }   

    //Funcão para checar se a data de checkin/checkout é válida
    ask_check(info){
        var requisicao = require('readline-sync');
        let date = requisicao.question(`Entre a sua data de ${info} (YYYY-MM-DD): `);
        let separated = date.split('-');
        if (separated.length != 3){
            console.log("Data inválida!");
            console.log(sep);
            return this.ask_check(info);
        }
        for (let i = 0; i < 3; i++){
            if (isNaN(separated[i])){
                console.log("Data inválida!");
                console.log(sep);
                return this.ask_check(info);
            }
        }
        if (separated[0].length != 4 || separated[1].length != 2 || separated[2].length != 2 || Number(separated[0]) > 2026 || Number(separated[0]) <= 1910 || Number(separated[1]) > 12 || Number(separated[1]) < 1 || Number(separated[2]) > 31 || Number(separated[2]) < 1){
            console.log("Data inválida!");
            console.log(sep);
            return this.ask_check(info);
        }
        const date_n = new Date(date);
        if (isNaN(date_n.getTime())){
            console.log("Data inválida!");
            console.log(sep);
            return this.ask_check(info);
        }
        return date;
    }

    //Funcão para comparar duas datas e retorna 0 se as funcoes sao iguais, 1 se a primeira é maior e 2 se a segunda é maior
    compare_dates(a, b){
        let a_sep = a.split('-')
        let b_sep = b.split('-')

        if (a_sep[0] > b_sep[0]) return 1
        else if (b_sep[0] > a_sep[0]) return 2

        if (a_sep[1] > b_sep[1]) return 1
        else if (b_sep[1] > a_sep[1]) return 2

        if (a_sep[2] > b_sep[2]) return 1
        else if (b_sep[2] > a_sep[2]) return 2

        return 0
    }

    //Funcão para comparar dois intervalos de datas e retorna true se os intervalos sao independentes entre si ou false se nao sao
    compare_intervals(a1, a2, b1, b2){
        let cmp_starts = this.compare_dates(a1, b1)

        if (cmp_starts == 0) return false
        else if (cmp_starts == 1){
            if (this.compare_dates(a1, b2) == 2) return false
            return true
        }
        else{
            if (this.compare_dates(b1, a2) == 2) return false
            return true
        }
    }

    login(){
        //Pedir os dados do usuário para tentar fazer o login
        var requisicao = require('readline-sync');
        var email = requisicao.question("Entre o seu email: ");
        var senha = requisicao.question("Entre a sua senha: ");
        console.log(sep);

        //Checar se os dados do usuário são encontrados no banco de dados de funcionário do hotel
        for (let i = 0; i < funcionarios.length; i++){
            if (funcionarios[i].email == email){

                //Checando se a senha é igual à senha criptografada;
                if (funcionarios[i].senha == senha){
                    console.clear();
                    this.funcionario_logado(funcionarios[i]);
                    return;
                }
                else{
                    console.log("Senha incorreta!");
                    this.login();
                    return;
                }
            }
        }
        //Checar se os dados do usuário são encontrados no banco de dados de cliente do hotel
        for (let i = 0; i < clientes.length; i++){
            if (clientes[i].email == email){
                if (clientes[i].senha == senha){
                    console.clear();
                    this.cliente_logado(clientes[i]);
                    return;
                }
                else{
                    console.log("Senha incorreta!");
                    this.login();
                    return;
                }
            }
        }
        console.log("Esse usuário não existe! Faça o cadastro primeiro!")
        new Sistema();
    }

    cadastro(){

        //Pedir ao usuário os dados necessários para o cadastro e checar se eles são válidos
        const bcrypt = require('bcrypt');   
        var requisicao = require('readline-sync');
        var nome = requisicao.question("Entre o seu nome: ");
        var email = this.ask_email();
        var senha = requisicao.question("Entre a sua senha: ");
        var data = this.ask_date();
        var cPf = this.ask_cpf();
        let cliente_novo = new Cliente(Math.floor(Math.random() * 100000), nome, data, cPf, email, senha);
        clientes.push(cliente_novo);
        clientes.sort((a, b) => a.nome.localeCompare(b.nome));
        new Sistema();
    }

    funcionario_logado(funcionario){
        var requisicao = require('readline-sync')
        console.log(`Bem vindo(a) ${funcionario.username}!`)
        console.log("1.Ver Meus Dados");
        console.log("2.Modificar Meus Dados");
        console.log("3.Ver Lista de Reservas (Ordem Cronológica do Checkin)");
        console.log("4.Ver Lista de Quartos (Ordem Alfabética)");
        console.log("5.Ver Lista de Clientes (Ordem Alfabética)");
        console.log("6.Mudar status da reserva (Reserva pendente, adiada, realizada, cancelada)");
        console.log("7.Adicionar Quarto");
        console.log("8.Editar Quarto");
        console.log("9.Excluir Quarto");
        console.log("10.Sair");
        var opcao = requisicao.question("Escolha uma opcao: ");
        console.log(sep)
        switch(opcao){
            case "1":
                //Mostrando os dados do funcionário
                console.clear();
                console.log("ID: " + funcionario.id);
                console.log("Usuário: " + funcionario.username);
                console.log("Email: " + funcionario.email)
                console.log("Senha: " + funcionario.senha);
                console.log("CPF: " + funcionario.cpf);
                console.log(sep);
                this.funcionario_logado(funcionario);
                break;
            case "2":
                //Dando as opções para o funcionário alterar seus dados
                console.clear();
                console.log("1.Usuário");
                console.log("2.Email");
                console.log("3.Senha");
                console.log("4.CPF");
                let change = requisicao.question("Escolha qual dado deseja alterar: ");
                console.log(sep);
                //Alterando os dados do funcionário mas checando se eles são válidos
                switch (change){
                    case "1":
                        funcionario.username = requisicao.question("Digite o seu novo usuário: ");;
                        break;
                    case "2":
                        funcionario.email = this.ask_email();
                        break;
                    case "3":
                        funcionario.senha = requisicao.question("Digite a sua nova senha: ");;
                        break;
                    case "4":
                        funcionario.cpf = this.ask_cpf();
                        break;
                    default:
                        console.log("Entrada inválida!");
                        this.funcionario_logado(funcionario);
                        break;
                }
                console.log("Dados alterados com sucesso!");
                console.log(sep);
                funcionarios.sort((a, b) => a.nome.localeCompare(b.nome));
                this.funcionario_logado(funcionario);
                break;
            case "3":
                //Checando se já foi realizado alguma reserva e, em caso positivo, mostrando todas essas reservas e seus dados. 
                console.clear();
                if (reservas.length == 0){
                    console.log("Não houveram reservas!");
                    console.log(sep);
                    this.funcionario_logado(funcionario);
                    break;
                }
                reservas.sort((a, b) => new Date(a.checkin) - new Date(b.checkin));
                for (let i = 0; i < reservas.length; i++){
                    let r = reservas[i];
                    console.log(`ID: ${r.id} | Cliente: ${r.id_cliente} | Checkin: ${r.checkin} | Checkout: ${r.checkout} | Nome do Quarto: ${r.quarto} | Status: ${r.status}`);
                }
                console.log(sep);
                this.funcionario_logado(funcionario);
                break;
            case "4":
                //Checando se já foi adicionado algum quarto e, em caso positivo, mostrando todos esses quartos e seus dados.
                console.clear();
                if (quartos.length == 0){
                    console.log("Não existem quartos!");
                    console.log(sep);
                    this.funcionario_logado(funcionario);
                    break;
                }
                quartos.sort((a, b) => a.nome.localeCompare(b.nome));
                for (let i = 0; i < quartos.length; i++){
                    let q = quartos[i];
                    console.log(`Nome: ${q.nome} | Descricao: ${q.descricao} | Preco por noite: ${q.precopornoite} | Quantidade de camas: ${q.camas}`);
                }
                console.log(sep);
                this.funcionario_logado(funcionario);
                break;
            case "5":
                //Checando se já foi adicionado algum cliente e, em caso positivo, mostrando todos esses clientes e seus dados, menos a senha, que deve ser algo privado.
                console.clear();
                if (clientes.length == 0){
                    console.log("Não existem clientes!");
                    console.log(sep);
                    this.funcionario_logado(funcionario);
                    break;
                }
                clientes.sort((a, b) => a.nome.localeCompare(b.nome));
                for (let i = 0; i < clientes.length; i++){
                    let c = clientes[i];
                    console.log(`ID: ${c.id} | Nome: ${c.nome} | Data de Nascimento ${c.data} | CPF: ${c.cpf} | Email: ${c.email}`);
                }
                console.log(sep);
                this.funcionario_logado(funcionario);
                break;
            case "6":
                //Checa se existem reservas, mostra todos eles com um número na frente e da a opção ao funcionário de qual reserva alterar e do novo status.
                console.clear();
                if (reservas.length == 0){
                    console.log("Não houveram reservas!");
                    console.log(sep);
                    this.funcionario_logado(funcionario);
                    break;
                }
                reservas.sort((a, b) => new Date(a.checkin) - new Date(b.checkin));
                for (let i = 0; i < reservas.length; i++){
                    let r = reservas[i];
                    console.log(`${i+1} -> ID: ${r.id} | Cliente: ${r.id_cliente} | Checkin: ${r.checkin} | Checkout: ${r.checkout} | Nome do Quarto: ${r.quarto} | Status: ${r.status}`);
                }
                let x = Number(requisicao.question("Escolha uma reserva para alterar o status: "))-1
                if (!reservas.includes(reservas[x]) || x >= reservas.length){
                    console.log("Essa entrada não é válida!");
                    console.log(sep);
                    this.funcionario_logado(funcionario);
                    break;
                }
                console.log(sep);
                console.log("1.Pendente");
                console.log("2.Adiada");
                console.log("3.Realizada");
                console.log("4.Cancelada");
                let new_status = requisicao.question("Escolha o novo status da reserva: ");
                switch(new_status){
                    case "1": 
                        reservas[x].status = "Pendente";
                        break;
                    case "2": 
                        reservas[x].status = "Adiada";
                        break;
                    case "3": 
                        reservas[x].status = "Realizada";
                        break;
                    case "4": 
                        reservas[x].status = "Cancelada";
                        break;
                    default:
                        console.log("Essa entrada não é válida!");
                        console.log(sep);
                        this.funcionario_logado(funcionario);
                        break;
                }
                console.log("Reserva alterada com sucesso!")
                reservas.sort((a, b) => new Date(a.checkin) - new Date(b.checkin));
                console.log(sep);
                this.funcionario_logado(funcionario);
                break;
            case "7":
                //Pede as informações do quarto, checa se elas são válidas e adiciona ao banco de dados.
                console.clear();
                let nome = requisicao.question("Digite o nome do quarto: ");
                let descricao = requisicao.question("Digite a descricao do quarto: ");
                let preco = this.ask_price();
                let camas = this.ask_beds();
                let novo_quarto = new Quarto(camas, preco, nome, descricao);
                quartos.push(novo_quarto);
                quartos.sort((a, b) => a.nome.localeCompare(b.nome));
                this.funcionario_logado(funcionario);
                console.log("Quarto adicionado com sucesso!")
                break;
            case "8":
                //Checa se existe quartos no banco de dados e apresenta a sua lista para o funcionário escolher qual deseja editar.
                console.clear();
                if (quartos.length == 0){
                    console.log("Não existem quartos!");
                    console.log(sep);
                    this.funcionario_logado(funcionario);
                    break;
                }
                for (let i = 0; i < quartos.length; i++){
                    let q = quartos[i];
                    console.log(`${i+1} -> Nome: ${q.nome} | Descricao: ${q.descricao} | Preco por noite: ${q.precopornoite} | Quantidade de camas: ${q.camas}`);
                }
                let q_to_change = Number(requisicao.question("Digite o quarto que deseja editar: "))-1
                if (!quartos.includes(quartos[q_to_change]) || q_to_change >= quartos.length){
                    console.log("Essa entrada não é válida!");
                    console.log(sep);
                    this.funcionario_logado(funcionario);
                    break;
                }
                //Da ao funcionário a opção de escolher qual dado do quarto dejeja alterar.
                console.log("1.Nome");
                console.log("2.Descricao");
                console.log("3.Preco por noite");
                console.log("4.Camas");
                let a_to_change = requisicao.question("Digite a característica que deseja editar: ");
                switch (a_to_change){
                    case "1":
                        quartos[q_to_change].nome = requisicao.question("Digite o novo nome para o quarto: "); ;
                        break;
                    case "2":
                        quartos[q_to_change].descricao = requisicao.question("Digite a nova descrição do quarto: "); ;
                        break;
                    case "3":
                        quartos[q_to_change].precopornoite = this.ask_price();
                        break;
                    case "4":
                        quartos[q_to_change].camas = this.ask_beds();
                        break;
                    default:
                        console.log("Essa entrada não é válida!");
                        console.log(sep);
                        this.funcionario_logado(funcionario);
                        break;
                }
                console.log("Quarto editado com sucesso!");
                console.log(sep);
                this.funcionario_logado(funcionario);
                break;
            case "9":
                //Checa se existe quartos e da ao funcionário a opção de escolher qual deseja remover
                console.clear();
                if (quartos.length == 0){
                    console.log("Não existem quartos!");
                    console.log(sep);
                    this.funcionario_logado(funcionario);
                    break;
                }
                for (let i = 0; i < quartos.length; i++){
                    let q = quartos[i];
                    console.log(`${i+1} -> Nome: ${q.nome} | Descricao: ${q.descricao} | Preco por noite: ${q.precopornoite} | Quantidade de camas: ${q.camas}`);
                }
                let q_to_remove = Number(requisicao.question("Digite o quarto que deseja excluir: "))-1;
                if (!quartos.includes(quartos[q_to_remove]) || q_to_remove >= quartos.length){
                    console.log("Essa entrada não é válida!");
                    console.log(sep);
                    this.funcionario_logado(funcionario);
                    break;
                }
                delete quartos[q_to_remove];
                quartos.splice(q_to_remove, 1);
                console.log("Quarto excluído com sucesso!");
                console.log(sep);
                this.funcionario_logado(funcionario);
                break;
            case "10":
                //Desloga o funcionário
                console.clear();
                new Sistema();
                break;
            default:
                console.log("Essa entrada não é válida!");
                console.log(sep);
                this.funcionario_logado(funcionario);
                break;
            }
    }

    cliente_logado(cliente){
        //Mostra a tela principal do cliente logado e da as opções de ações a se tomar
        var requisicao = require('readline-sync');
        console.log(`Bem Vindo(a) ${cliente.nome}!`);
        console.log("1.Ver Meus Dados");
        console.log("2.Modificar Meus Dados");
        console.log("3.Ver Lista de Quartos (Ordem Alfabética)");
        console.log("4.Fazer reserva");
        console.log("5.Cancelar reserva");
        console.log("6.Ver minhas reservas (Ordem Cronológica do CheckIn)");
        console.log("7.Avaliar estadia");
        console.log("8.Visualizar avaliações");
        console.log("9.Sair");
        var opcao = requisicao.question("Escolha uma opcao: ");
        console.log(sep)
        switch(opcao){
            case "1":
                //Mostra os dados do cliente que está logado
                console.clear();
                console.log("ID: " + cliente.id);
                console.log("Nome: " + cliente.nome);
                console.log("Email: " + cliente.email)
                console.log("Senha: " + cliente.senha);
                console.log("Data de Nascimento: " + cliente.data);
                console.log("CPF: " + cliente.cpf);
                console.log(sep);
                this.cliente_logado(cliente);
                break;
            case "2":
                //Da a opção ao usuário de qual dado alterar e o muda de acordo
                console.clear();
                console.log("1.Nome");
                console.log("2.Email");
                console.log("3.Senha");
                console.log("4.Data de Nascimento");
                console.log("5.CPF");
                let change = requisicao.question("Escolha qual dado deseja alterar: ");
                console.log(sep);
                switch (change){
                    case "1":
                        cliente.nome = requisicao.question("Digite o seu novo nome: ");
                        break;
                    case "2":
                        cliente.email = this.ask_email();
                        break;
                    case "3":
                        cliente.senha = requisicao.question("Digite a sua nova senha: ");
                        break;
                    case "4":
                        cliente.data = this.ask_date();
                        break;
                    case "5":
                        cliente.cpf = this.ask_cpf();
                        break;
                    default:
                        console.log("Entrada inválida!");
                        this.cliente_logado(cliente);
                        break;
                }
                console.log("Dados alterados com sucesso!");
                console.log(sep);
                clientes.sort((a, b) => a.nome.localeCompare(b.nome));
                this.cliente_logado(cliente);
                break;
            case "3":
                //Checando se já foi adicionado algum quarto e, em caso positivo, mostrando todos esses quartos e seus dados.
                console.clear();
                if (quartos.length == 0){
                    console.log("Não existem quartos!");
                    console.log(sep);
                    this.cliente_logado(cliente);
                    break;
                }
                quartos.sort((a, b) => a.nome.localeCompare(b.nome));
                for (let i = 0; i < quartos.length; i++){
                    let q = quartos[i];
                    console.log(`Nome: ${q.nome} | Descricao: ${q.descricao} | Preco por noite: ${q.precopornoite} | Quantidade de camas: ${q.camas}`);
                }
                console.log(sep);
                this.cliente_logado(cliente);
                break;
            case "4":
                //Checa se existem quartos no banco de dados, os mostra e computa a reserva que o cliente desejar
                console.clear();
                if (quartos.length == 0){
                    console.log("Não existem quartos!");
                    console.log(sep);
                    this.cliente_logado(cliente);
                    break;
                }
                for (let i = 0; i < quartos.length; i++){
                    let q = quartos[i];
                    console.log(`${i+1} -> Nome: ${q.nome} | Descricao: ${q.descricao} | Preco por noite: ${q.precopornoite} | Quantidade de camas: ${q.camas}`);
                }
                let r_qrt = Number(requisicao.question("Digite o quarto da reserva: "))-1;
                console.log(sep);
                if (!quartos.includes(quartos[r_qrt]) || r_qrt >= quartos.length){
                    console.log("Essa entrada não é válida!");
                    console.log(sep);
                    this.cliente_logado(cliente);
                    break;
                }
                let cin = this.ask_check("checkin")
                let cout = this.ask_check("checkout")
                let check = false;
                for (let i = 0; i < reservas.length; i++){
                    if (reservas[i].quarto == quartos[r_qrt].nome){
                        if (!this.compare_intervals(reservas[i].checkin, reservas[i].checkout, cin, cout)){
                            console.log(`Esse quarto já está reservado dos dias ${reservas[i].checkin} - ${reservas[i].checkout}`);
                            console.log(sep);
                            check = true;
                            this.cliente_logado(cliente);
                            break;
                        }
                    }
                }
                if (check) break
                let new_r = new Reserva(Math.floor(Math.random() * 10000000), cliente.id, "Pendente", cin, cout, quartos[r_qrt].nome, false);
                reservas.push(new_r);
                console.log("Reserva realizada com sucesso!");
                console.log(sep);
                this.cliente_logado(cliente);
                break;
            case "5":
                //Checa se o cliente já fez alguma reserva e mostra-as.
                console.clear();
                reservas.sort((a, b) => new Date(a.checkin) - new Date(b.checkin));
                let c_reservas = [];
                var is_reserva = false;
                for (let i = 0; i < reservas.length; i++){
                    let r = reservas[i];
                    if (r.id_cliente == cliente.id){
                        c_reservas.push(reservas[i]);
                        console.log(`${i+1} -> ID: ${r.id} | Cliente: ${r.id_cliente} | Checkin: ${r.checkin} | Checkout: ${r.checkout} | Nome do Quarto: ${r.quarto} | Status: ${r.status}`);
                        is_reserva = true;
                    }
                }
                if (reservas.length == 0 || is_reserva == false){
                    console.log("Você não fez nenhuma reserva!");
                    console.log(sep);
                    this.cliente_logado(cliente);
                    break;
                }

                //Da a opção ao cliente de escolher qual reserva cancelar, mas só pode cancelá-la se ela ainda não foi realizada.
                let r_to_cancel = Number(requisicao.question("Digite o número da reserva para cancelar: "))-1; 
                if (r_to_cancel <= -1 || r_to_cancel >= reservas.length || !Number.isInteger(r_to_cancel) || !c_reservas.includes(reservas[r_to_cancel])){
                    console.log("Essa entrada não é válida!");
                    console.log(sep);
                    this.cliente_logado(cliente);
                    break;
                }
                else if (reservas[r_to_cancel].status == "Realizada"){
                    console.log("Essa reserva já foi concluída!");
                    console.log(sep);
                    this.cliente_logado(cliente);
                    break;
                }
                else if (reservas[r_to_cancel].status == "Cancelada"){
                    console.log("Essa reserva já foi cancelada!");
                    console.log(sep);
                    this.cliente_logado(cliente);
                    break;
                }
                reservas[r_to_cancel].status = "Cancelada";
                console.log("Reserva cancelada com sucesso!");
                console.log(sep);
                this.cliente_logado(cliente);
                break;
            case "6":
                //Mostra as reservas realizados pelo cliente em ordem cronológica.
                console.clear();
                is_reserva = false;
                reservas.sort((a, b) => new Date(a.checkin) - new Date(b.checkin));
                for (let i = 0; i < reservas.length; i++){
                    let r = reservas[i];
                    if (r.id_cliente == cliente.id){
                        console.log(`ID: ${r.id} | Cliente: ${r.id_cliente} | Checkin: ${r.checkin} | Checkout: ${r.checkout} | Nome do Quarto: ${r.quarto} | Status: ${r.status}`);
                        is_reserva = true;
                    }
                }
                if (reservas.length == 0 || is_reserva == false){
                    console.log("Você não fez nenhuma reserva!");
                    console.log(sep);
                    this.cliente_logado(cliente);
                    break;
                }
                console.log(sep);
                this.cliente_logado(cliente);
                break;
            case "7":
                //Checa se o cliente fez alguma reserva e o mostra todos as reservas que fez e deixa-o escolher qual avaliar.
                console.clear();
                is_reserva = false;
                let reservas_cliente = []
                reservas.sort((a, b) => new Date(a.checkin) - new Date(b.checkin));
                for (let i = 0; i < reservas.length; i++){
                    let r = reservas[i];
                    if (r.id_cliente == cliente.id){
                        reservas_cliente.push(r);
                        console.log(`${i+1} -> ID: ${r.id} | Cliente: ${r.id_cliente} | Checkin: ${r.checkin} | Checkout: ${r.checkout} | Nome do Quarto: ${r.quarto} | Status: ${r.status}`);
                        is_reserva = true;
                    }
                }
                if (reservas.length == 0 || is_reserva == false){
                    console.log("Não houveram reservas!");
                    console.log(sep);
                    this.cliente_logado(cliente);
                    break;
                }
                let reserva_a = Number(requisicao.question("Digite o número da reserva a ser avaliada: "))-1;
                if (!reservas_cliente.includes(reservas[reserva_a])){
                    console.log("Reserva inválida!");
                    console.log(sep);
                    this.cliente_logado(cliente);
                    break;
                }
                //Caso a reserva já tenha sido avaliada, o programa bloqueia uma nova avaliação
                else if (reservas[reserva_a].avaliada){
                    console.log("Você já avaliou essa reserva!");
                    console.log(sep);
                    this.cliente_logado(cliente);
                    break;
                }
                //Deixa o cliente escolher a nota e o texto da avaliação, bloqueando a nota caso ela não seja um número ou esteja fora das restrições
                let nota = Number(requisicao.question("Qual nota voce daria para a estadia? (0-10): "))
                if (nota < 0 || nota > 10 || nota == NaN){
                    console.log("Nota inválida!");
                    console.log(sep);
                    this.cliente_logado(cliente);
                    break;
                }
                let texto = requisicao.question("Qual a sua avaliação sobre a estadia?: ")
                console.log(sep);
                let aval = new Avaliacao(nota, texto, reservas[reserva_a].id, reservas[reserva_a].quarto);
                reservas[reserva_a].avaliada = true;
                avaliacoes.push(aval);
                console.log("Avaliação enviada com sucesso!");
                console.log(sep);
                this.cliente_logado(cliente);
                break;
            case "8":
                //Checa se já houveram avaliações e as mostra
                console.clear();
                if (avaliacoes.length == 0){
                    console.log("Não há avaliações!");
                    console.log(sep);
                    this.cliente_logado(cliente);
                    break;
                }
                for (let i = 0; i < avaliacoes.length; i++){
                    let a = avaliacoes[i];
                    console.log(`Quarto: ${a.quarto} | Nota: ${a.nota} | Texto: ${a.texto}`);
                }
                console.log(sep);
                this.cliente_logado(cliente);
                break;
            case "9":
                //Desloga o cliente.
                console.clear();
                new Sistema();
                break;
            default:
                console.log("Essa entrada não é válida!");
                console.log(sep);
                this.cliente_logado(cliente);
                break;
        }
        //Organiza a lista de reservas, clientes e quartos nas ordens cronológica pelo checkin, alfabética e alfabética, respectivamente
        reservas.sort((a, b) => new Date(a.checkin) - new Date(b.checkin));
        clientes.sort((a, b) => a.nome.localeCompare(b.nome));
        quartos.sort((a, b) => a.nome.localeCompare(b.nome));
    }
}

//Inicializando variáveis globais que serão usadas em todo o código.
var sep = "--------------------------------------";
var funcionarios = []
var clientes = []
var reservas = []
var quartos = []
var avaliacoes = []
const fs = require('fs').promises;

async function main(){

    // Função para salvar as listas em um arquivo
    async function saveLists() {
        const data = { funcionarios, clientes, reservas, quartos, avaliacoes};
        const jsonString = JSON.stringify(data, null, 2);
        try {
        await fs.writeFile('listas.json', jsonString);
        } catch (err) {
        console.error('Erro ao salvar o arquivo:', err);
        }
    }
    
    // Função para carregar as listas de um arquivo
    async function loadLists() {
        try {
        const data = await fs.readFile('listas.json', 'utf8');
        const parsedData = JSON.parse(data);
        if (data.length == 0){
            await fs.writeFile('listas.json', JSON.stringify('{"funcionarios":[],"clientes":[],"reservas":[],"quartos":[],"avaliacoes":[]}', null, 2));
        }

        // Populando as listas com os dados do arquivo
        funcionarios = parsedData.funcionarios;
        clientes = parsedData.clientes;
        reservas = parsedData.reservas;
        quartos = parsedData.quartos;
        avaliacoes = parsedData.avaliacoes;
        } catch (err) {
        await fs.writeFile('listas.json', JSON.stringify('{"funcionarios":[],"clientes":[],"reservas":[],"quartos":[],"avaliacoes":[]}', null, 2));
        }
    }
    //É impossível um funcionário se registrar como se fosse cliente, então as credenciais dos funcionários devem ser definidas previamente. Coloquei um de exemplo para testar as funcionalidades do funcionário.
    var funcionario1 = new Funcionario("1000", "gabs", "39880529812", "ga@gmail.com", "12345");
    funcionarios.push(funcionario1);
    await loadLists();
    console.clear();
    new Sistema();
    await saveLists();
}
main();