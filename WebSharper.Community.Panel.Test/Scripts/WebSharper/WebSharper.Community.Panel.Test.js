(function()
{
 "use strict";
 var Global,WebSharper,Community,Panel,Test,Client,SC$1,UI,Next,Doc,AttrModule,List,IntelliFactory,Runtime,PanelContainer;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Panel=Community.Panel=Community.Panel||{};
 Test=Panel.Test=Panel.Test||{};
 Client=Test.Client=Test.Client||{};
 SC$1=Global.StartupCode$WebSharper_Community_Panel_Test$Client=Global.StartupCode$WebSharper_Community_Panel_Test$Client||{};
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 Doc=Next&&Next.Doc;
 AttrModule=Next&&Next.AttrModule;
 List=WebSharper&&WebSharper.List;
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 PanelContainer=Panel&&Panel.PanelContainer;
 Client.Main=function()
 {
  var listPanels,a,a$1,panelContainerDiv,a$2,a$3,a$4,a$5,a$6,a$7,a$8,a$9,a$10,a$11,a$12,a$13,a$14,a$15,a$16,a$17,a$18;
  listPanels=(a=function(m)
  {
   return m.Key;
  },(a$1=function(a$19)
  {
   return Client.panelContainer().RenderPanelItem(a$19);
  },function(a$19)
  {
   return Doc.ConvertBy(a,a$1,a$19);
  })(Client.panelContainer().PanelItems.v));
  panelContainerDiv=(a$2=[AttrModule.Style("border","1px solid white"),AttrModule.Style("Width","800px"),AttrModule.Style("Height","400px"),AttrModule.Style("left","0px"),AttrModule.Style("top","0px"),AttrModule.Style("position","relative")],Doc.Element("div",a$2,[listPanels]));
  a$3=[(a$4=[(a$5=[(a$6=[AttrModule.Style("vertical-align","top")],(a$7=[(a$8=[(a$9=[AttrModule.Style("Height","100%")],(a$10=[(a$11=[AttrModule.Style("Height","100%")],(a$12=[(a$13=[AttrModule.Class("material-icons orange600")],(a$14=[Doc.TextNode("dehaze")],Doc.Element("i",a$13,a$14)))],Doc.Element("td",a$11,a$12)))],Doc.Element("tr",a$9,a$10))),(a$15=[(a$16=[(a$17=[AttrModule.Class("material-icons orange600"),AttrModule.Style("cursor","pointer"),AttrModule.Handler("mousedown",function()
  {
   return function()
   {
    var z_index,a$19,a$20,a$21,a$22,a$23,a$24,a$25,a$26,a$27,a$28,a$29,a$30,a$31,a$32;
    z_index=List.ofSeq(Client.panelContainer().PanelItems).get_Length()+1;
    Global.console.log("Create new panel");
    a$19=List.ofArray([AttrModule.Style("Width","150px")]);
    a$20=List.ofArray([AttrModule.Class("panelTitle")]);
    a$21=List.ofArray([(a$22=[AttrModule.Style("width","100%")],(a$23=[(a$24=[(a$25=[Doc.TextNode("Panel "+Global.String(z_index))],Doc.Element("td",[],a$25)),(a$26=[AttrModule.Style("text-align","right"),AttrModule.Style("vertical-align","middle")],(a$27=[(a$28=[AttrModule.Class("material-icons orange600 small"),AttrModule.Style("cursor","pointer"),AttrModule.Handler("mousedown",function(elem)
    {
     return function()
     {
      var m,haItem;
      m=Client.panelContainer().FindPanelItemFromChildElement(elem);
      return(m!=null?m.$==1:false)?(haItem=m.$0,Client.panelContainer().PanelItems.Remove(haItem)):null;
     };
    })],(a$29=[Doc.TextNode("clear")],Doc.Element("i",a$28,a$29)))],Doc.Element("td",a$26,a$27)))],Doc.Element("tr",[],a$24))],Doc.Element("table",a$22,a$23)))]);
    a$30=(a$31=[AttrModule.Class("panelContent")],(a$32=[Doc.TextNode("Content")],Doc.Element("div",a$31,a$32)));
    return Client.panelContainer().CreateItem("Panel "+Global.String(z_index),a$19,a$20,a$21,a$30);
   };
  })],(a$18=[Doc.TextNode("add")],Doc.Element("i",a$17,a$18)))],Doc.Element("td",[],a$16))],Doc.Element("tr",[],a$15))],Doc.Element("table",[],a$8))],Doc.Element("td",a$6,a$7))),Doc.Element("td",[],[panelContainerDiv])],Doc.Element("tr",[],a$5))],Doc.Element("table",[],a$4))];
  return Doc.Element("div",[],a$3);
 };
 Client.panelContainer=function()
 {
  SC$1.$cctor();
  return SC$1.panelContainer;
 };
 SC$1.$cctor=Runtime.Cctor(function()
 {
  SC$1.panelContainer=PanelContainer.get_Create();
  SC$1.$cctor=Global.ignore;
 });
}());
