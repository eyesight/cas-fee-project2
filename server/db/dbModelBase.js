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

}

module.exports=ModelBase;
