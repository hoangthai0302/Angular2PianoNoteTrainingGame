import {Injectable} from "angular2/core";
import {IUserResultItem} from "../contracts/IUserResultItem";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/share';

@Injectable()
export class ScoreTracker {

    todos$: Observable<Array<IUserResultItem>>;
    private _todosObserver: any;
    public score = 0;
    public result: IUserResultItem[];
    private _dataStore: {
        todos: Array<IUserResultItem>
    };

    constructor(){
        this.result = [];
        this.todos$ = new Observable(observer => this._todosObserver = observer).share();
        this._dataStore = { todos: [] };
    }

    updateScore(result: IUserResultItem){
        this.result.push(result);
        this._dataStore.todos.push(result);
        this._todosObserver.next(this._dataStore.todos);
    }

}