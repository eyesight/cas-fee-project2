/**
 * Created by awedag on 30.10.17.
 */

// ModelBase is mainly for easier database handling as the class must only contain fields from database
// to keep it working properly dont add any static functions to it as this will be
// interpreted as properties in getOwnPropertyNAmes
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

  mySqlGetInsertStatement(tablename){
    return "insert into "+tablename+" ("+this.getClassMembers().join(', ')+") values( " + this.getStringWithX('?').join(', ') +")";
  }
   mySqlGetSelectStatement(tablename, whereclause){
   // this.mySqlGetSelectStatement(tablename,whereclause);
    var wcl =  whereclause || '1=1'
    return "select "+this.getClassMembers().join(', ')+" from "+tablename+" where "+ whereclause;
      //where id=?";
  }

}

module.exports=ModelBase;
