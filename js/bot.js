import {VK} from './vk.js';
import {App} from './app.js';

export class Bot{
    static start_talking(){
        if (!this.myid){ //чтобы по нажатию на ту же кнопку можно было стопить
            this.myid = setInterval(()=>{ //сделать обработчик на случай если не удастся отправить сообщение
                VK.send_request('messages.getDialogs',{offset:0, count:53}, (data)=>{Bot.talk(data.response);});
            },1000);
            console.log('Бот заговорил');
        }else {
            clearInterval(this.myid);
            this.myid = undefined;
            console.log('Бот замолчал');
        }
    }

    static talk(dialogs){
        for(let i = 1; i<dialogs.length;i++)
            if (dialogs[i].out === 0 && dialogs[i].read_state === 0)
                Bot.send_message(dialogs[i].uid, App.listen_comand(dialogs[i].body));

    }

    static send_message(uid, text){
        VK.send_request('messages.send',{user_id: uid, message: text}, ()=>{console.log('Сообщение отправлено пользователю с id' + uid);});
    }
}
