class ApiResponse{
constructor(statusCode,Massage="Api is Used",data={})
{
this.statusCode= statusCode ;
this.Massage= Massage ;
this.data= data ;
}
}

export {ApiResponse}