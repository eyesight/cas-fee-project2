/**
 * Created by awedag on 30.10.17.
 */


class ModelBase {

  getAttributeList() {
    return Object.values(this);
  }

  getClassMembers() {
    return Object.getOwnPropertyNames(this);
  }

  getStringWithX(s){
    var result = [];

    for (var i = 1; i <= Object.getOwnPropertyNames(this).length; i++) {
      result.push(s);
    }
    return result;
    //eturn Object.values(this).reduce((result,x) => [...result, s] );

  }

}

module.exports=ModelBase;
