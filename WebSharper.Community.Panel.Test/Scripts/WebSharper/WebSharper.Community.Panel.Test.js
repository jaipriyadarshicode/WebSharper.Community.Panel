(function()
{
 "use strict";
 var Global,WebSharper,Community,Panel,Test,Client,SC$1,UI,Next,AttrModule,Doc,List,PanelContainer,LayoutManagers,Panel$1,Var,TitleButton,PropertyGrid,Properties,IntelliFactory,Runtime,PropertyGrid$1;
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
 PanelContainer=Panel&&Panel.PanelContainer;
 LayoutManagers=Panel&&Panel.LayoutManagers;
 Panel$1=Panel&&Panel.Panel;
 Var=Next&&Next.Var;
 TitleButton=Panel&&Panel.TitleButton;
 PropertyGrid=Community&&Community.PropertyGrid;
 Properties=PropertyGrid&&PropertyGrid.Properties;
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 PropertyGrid$1=PropertyGrid&&PropertyGrid.PropertyGrid;
 Client.Main=function()
 {
  var a,a$1,a$2,a$3,a$4,a$5,a$6,a$7,a$8,a$9,a$10,a$11,a$12,a$13,a$14,a$15,a$16,a$17,a$18;
  a=[(a$1=[(a$2=[(a$3=[AttrModule.Style("vertical-align","top")],(a$4=[(a$5=[(a$6=[AttrModule.Style("Height","100%")],(a$7=[(a$8=[AttrModule.Style("Height","100%")],(a$9=[(a$10=[AttrModule.Class("material-icons orange600")],(a$11=[Doc.TextNode("dehaze")],Doc.Element("i",a$10,a$11)))],Doc.Element("td",a$8,a$9)))],Doc.Element("tr",a$6,a$7))),(a$12=[(a$13=[(a$14=[AttrModule.Class("material-icons orange600"),AttrModule.Style("cursor","pointer"),AttrModule.Handler("mousedown",function()
  {
   return function()
   {
    var z_index,childPanelContainer,childPanel,a$19,a$20,titleVar,panel;
    z_index=List.ofSeq(Client.panelContainer().PanelItems).get_Length()+1;
    childPanelContainer=PanelContainer.get_Create().WithLayoutManager(LayoutManagers.StackPanelLayoutManager());
    childPanel=Panel$1.get_Create().WithTitle(false).WithPannelAttrs([AttrModule.Style("position","absolute")]).WithPanelContent((a$19=[AttrModule.Class("panelContent"),AttrModule.Style("Width","150px")],(a$20=[Doc.TextNode("Content")],Doc.Element("div",a$19,a$20))));
    childPanelContainer.AddPanel(childPanel);
    titleVar=Var.Create$1("Panel "+Global.String(z_index));
    panel=Panel$1.get_Create().WithPannelAttrs([AttrModule.Style("Width","150px"),AttrModule.Style("position","absolute")]).WithTitleContent(Doc.TextView(titleVar.v)).WithTitleButtons(List.ofArray([TitleButton.New("add",function()
    {
    }),TitleButton.New("edit",function(panel$1)
    {
     Client.propertyGrid().Edit(panel$1.Properties);
    }),TitleButton.New("clear",function(panel$1)
    {
     Client.panelContainer().PanelItems.Remove(Client.panelContainer().FindPanelItem(panel$1));
    })])).WithChildPanelContainer(childPanelContainer).WithProperties(List.ofArray([Properties.string("title1",titleVar)]));
    return Client.panelContainer().AddPanel(panel);
   };
  })],(a$15=[Doc.TextNode("add")],Doc.Element("i",a$14,a$15)))],Doc.Element("td",[],a$13))],Doc.Element("tr",[],a$12)),(a$16=[(a$17=[Client.propertyGrid().get_Render()],Doc.Element("td",[],a$17))],Doc.Element("tr",[],a$16))],Doc.Element("table",[],a$5))],Doc.Element("td",a$3,a$4))),(a$18=[Client.panelContainer().get_Render()],Doc.Element("td",[],a$18))],Doc.Element("tr",[],a$2))],Doc.Element("table",[],a$1))];
  return Doc.Element("div",[],a);
 };
 Client.propertyGrid=function()
 {
  SC$1.$cctor();
  return SC$1.propertyGrid;
 };
 Client.panelContainer=function()
 {
  SC$1.$cctor();
  return SC$1.panelContainer;
 };
 SC$1.$cctor=Runtime.Cctor(function()
 {
  SC$1.panelContainer=PanelContainer.get_Create().WithWidth(800).WithHeight(400).WithLayoutManager(LayoutManagers.FloatingPanelLayoutManager(5)).WithAttributes([AttrModule.Style("border","1px solid white")]);
  SC$1.propertyGrid=PropertyGrid$1.get_Create();
  SC$1.$cctor=Global.ignore;
 });
}());
