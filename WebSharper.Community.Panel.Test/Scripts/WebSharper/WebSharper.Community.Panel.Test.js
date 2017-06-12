(function()
{
 "use strict";
 var Global,WebSharper,Community,Panel,Test,Client,SC$1,UI,Next,AttrModule,Doc,List,Panel$1,TitleButton,IntelliFactory,Runtime,PanelContainer,LayoutManagers;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Panel=Community.Panel=Community.Panel||{};
 Test=Panel.Test=Panel.Test||{};
 Client=Test.Client=Test.Client||{};
 SC$1=Global.StartupCode$WebSharper_Community_Panel_Test$Client=Global.StartupCode$WebSharper_Community_Panel_Test$Client||{};
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 AttrModule=Next&&Next.AttrModule;
 Doc=Next&&Next.Doc;
 List=WebSharper&&WebSharper.List;
 Panel$1=Panel&&Panel.Panel;
 TitleButton=Panel&&Panel.TitleButton;
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 PanelContainer=Panel&&Panel.PanelContainer;
 LayoutManagers=Panel&&Panel.LayoutManagers;
 Client.Main=function()
 {
  var a,a$1,a$2,a$3,a$4,a$5,a$6,a$7,a$8,a$9,a$10,a$11,a$12,a$13,a$14,a$15,a$16;
  a=[(a$1=[(a$2=[(a$3=[AttrModule.Style("vertical-align","top")],(a$4=[(a$5=[(a$6=[AttrModule.Style("Height","100%")],(a$7=[(a$8=[AttrModule.Style("Height","100%")],(a$9=[(a$10=[AttrModule.Class("material-icons orange600")],(a$11=[Doc.TextNode("dehaze")],Doc.Element("i",a$10,a$11)))],Doc.Element("td",a$8,a$9)))],Doc.Element("tr",a$6,a$7))),(a$12=[(a$13=[(a$14=[AttrModule.Class("material-icons orange600"),AttrModule.Style("cursor","pointer"),AttrModule.Handler("mousedown",function()
  {
   return function()
   {
    var z_index,panel,a$17,a$18;
    z_index=List.ofSeq(Client.panelContainer().PanelItems).get_Length()+1;
    panel=Panel$1.get_Create().WithPannelAttrs([AttrModule.Style("Width","150px")]).WithTitleContent(Doc.TextNode("Panel "+Global.String(z_index))).WithTitleButtons(List.ofArray([TitleButton.New("add",function()
    {
    }),TitleButton.New("edit",function()
    {
    }),TitleButton.New("clear",function(panel$1)
    {
     Client.panelContainer().PanelItems.Remove(Client.panelContainer().FindPanelItem(panel$1));
    })])).WithPanelContent((a$17=[AttrModule.Class("panelContent")],(a$18=[Doc.TextNode("Content")],Doc.Element("div",a$17,a$18))));
    return Client.panelContainer().AddPanel(panel);
   };
  })],(a$15=[Doc.TextNode("add")],Doc.Element("i",a$14,a$15)))],Doc.Element("td",[],a$13))],Doc.Element("tr",[],a$12))],Doc.Element("table",[],a$5))],Doc.Element("td",a$3,a$4))),(a$16=[Client.panelContainer().get_Render()],Doc.Element("td",[],a$16))],Doc.Element("tr",[],a$2))],Doc.Element("table",[],a$1))];
  return Doc.Element("div",[],a);
 };
 Client.panelContainer=function()
 {
  SC$1.$cctor();
  return SC$1.panelContainer;
 };
 SC$1.$cctor=Runtime.Cctor(function()
 {
  SC$1.panelContainer=PanelContainer.get_Create().WithWidth(400).WithHeight(400).WithLayoutManager(LayoutManagers.StackPanelLayoutManager()).WithAttributes([AttrModule.Style("border","1px solid white"),AttrModule.Style("left","0px"),AttrModule.Style("top","0px"),AttrModule.Style("position","relative")]);
  SC$1.$cctor=Global.ignore;
 });
}());
