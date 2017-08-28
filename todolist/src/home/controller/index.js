'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    let tcount = '0';
    let dcount = '0';
    let todo_model = this.model('todo');
    let done_model = this.model('done');
    let title = this.post('title');
    if(this.isPost()){
    	let result = await todo_model.add({task:title});
      console.log(title);
      title = "";
      console.log(title);
    }
    tcount = await todo_model.count();
    dcount = await done_model.count();
    this.assign('tcount',tcount);
    this.assign('dcount',dcount);
    return this.display();
  }
}