(function()
{
 "use strict";
 var Global,WebSharper,Community,Panel,Test,Client,ContentItem,ContentModel,SC$1,IntelliFactory,Runtime,UI,Next,Doc,List,ListModel,AttrModule,PanelContainer,LayoutManagers,Panel$1,Var,TitleButton,PropertyGrid,Properties,PropertyGrid$1,Dialog;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Panel=Community.Panel=Community.Panel||{};
 Test=Panel.Test=Panel.Test||{};
 Client=Test.Client=Test.Client||{};
 ContentItem=Client.ContentItem=Client.ContentItem||{};
 ContentModel=Client.ContentModel=Client.ContentModel||{};
 SC$1=Global.StartupCode$WebSharper_Community_Panel_Test$Client=Global.StartupCode$WebSharper_Community_Panel_Test$Client||{};
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 Doc=Next&&Next.Doc;
 List=WebSharper&&WebSharper.List;
 ListModel=Next&&Next.ListModel;
 AttrModule=Next&&Next.AttrModule;
 PanelContainer=Panel&&Panel.PanelContainer;
 LayoutManagers=Panel&&Panel.LayoutManagers;
 Panel$1=Panel&&Panel.Panel;
 Var=Next&&Next.Var;
 TitleButton=Panel&&Panel.TitleButton;
 PropertyGrid=Community&&Community.PropertyGrid;
 Properties=PropertyGrid&&PropertyGrid.Properties;
 PropertyGrid$1=PropertyGrid&&PropertyGrid.PropertyGrid;
 Dialog=Panel&&Panel.Dialog;
 ContentItem.New=function(Text)
 {
  return{
   Text:Text
  };
 };
 ContentModel=Client.ContentModel=Runtime.Class({
  get_Render:function()
  {
   var x,a;
   x=this.Items.v;
   a=this.Items.key;
   return Doc.ConvertBy(a,function(item)
   {
    var a$1;
    a$1=[Doc.TextNode(item.Text)];
    return Doc.Element("div",[],a$1);
   },x);
  }
 },null,ContentModel);
 ContentModel.get_Create=function()
 {
  var a;
  return ContentModel.New((a=List.ofArray([ContentItem.New("Content 1")]),ListModel.Create(function(item)
  {
   return item.Text;
  },a)));
 };
 ContentModel.New=function(Items)
 {
  return new ContentModel({
   Items:Items
  });
 };
 Client.Main=function()
 {
  var a,a$1,a$2,a$3,a$4,a$5,a$6,a$7,a$8,a$9,a$10,a$11,a$12,a$13,a$14,a$15,a$16,a$17,a$18,a$19,a$20,a$21,a$22,a$23,a$24;
  a=[(a$1=[(a$2=[(a$3=[AttrModule.Style("vertical-align","top")],(a$4=[(a$5=[(a$6=[AttrModule.Style("Height","100%")],(a$7=[(a$8=[AttrModule.Style("Height","100%")],(a$9=[(a$10=[AttrModule.Class("material-icons orange600")],(a$11=[Doc.TextNode("dehaze")],Doc.Element("i",a$10,a$11)))],Doc.Element("td",a$8,a$9)))],Doc.Element("tr",a$6,a$7))),(a$12=[AttrModule.Style("Height","100%")],(a$13=[(a$14=[AttrModule.Style("Height","100%")],(a$15=[(a$16=[AttrModule.Class("material-icons orange600"),AttrModule.Style("cursor","pointer"),AttrModule.Handler("mousedown",function()
  {
   return function()
   {
    var a$25,a$26;
    a$25=(a$26=[Doc.TextNode("Content")],Doc.Element("div",[],a$26));
    return Client.dlg().ShowDialog("Dialog title",a$25);
   };
  })],(a$17=[Doc.TextNode("announcement")],Doc.Element("i",a$16,a$17)))],Doc.Element("td",a$14,a$15)))],Doc.Element("tr",a$12,a$13))),(a$18=[(a$19=[(a$20=[AttrModule.Class("material-icons orange600"),AttrModule.Style("cursor","pointer"),AttrModule.Handler("mousedown",function()
  {
   return function()
   {
    var z_index,childPanelContainer,contentItems,childPanel,titleVar,panel;
    z_index=List.ofSeq(Client.panelContainer().PanelItems).get_Length()+1;
    childPanelContainer=PanelContainer.get_Create().WithLayoutManager(LayoutManagers.StackPanelLayoutManager());
    contentItems=ContentModel.get_Create();
    childPanel=Panel$1.get_Create().WithTitle(false).WithPannelAttrs([AttrModule.Class("panelContent")]).WithPanelContent(contentItems.get_Render()).WithWidth(150).WithHeight(150);
    childPanelContainer.AddPanel(childPanel);
    titleVar=Var.Create$1("Panel "+Global.String(z_index));
    panel=Panel$1.get_Create().WithPannelAttrs([AttrModule.Style("position","absolute")]).WithTitleContent(Doc.TextView(titleVar.v)).WithTitleButtons(List.ofArray([TitleButton.New("add",function()
    {
     var index,c;
     index=List.ofSeq(contentItems.Items).get_Length();
     index<7?contentItems.Items.Append(ContentItem.New("Content "+(c=index+1,Global.String(c)))):void 0;
    }),TitleButton.New("edit",function(panel$1)
    {
     Client.propertyGrid().Edit(panel$1.Properties);
    }),TitleButton.New("clear",function(panel$1)
    {
     Client.panelContainer().PanelItems.Remove(Client.panelContainer().FindPanelItem(panel$1));
    })])).WithChildPanelContainer(childPanelContainer).WithWidth(150).WithProperties(List.ofArray([Properties.string("title1",titleVar)]));
    return Client.panelContainer().AddPanel(panel);
   };
  })],(a$21=[Doc.TextNode("add")],Doc.Element("i",a$20,a$21)))],Doc.Element("td",[],a$19))],Doc.Element("tr",[],a$18)),(a$22=[(a$23=[Client.dlg().get_Render(),Client.propertyGrid().get_Render()],Doc.Element("td",[],a$23))],Doc.Element("tr",[],a$22))],Doc.Element("table",[],a$5))],Doc.Element("td",a$3,a$4))),(a$24=[Client.panelContainer().get_Render()],Doc.Element("td",[],a$24))],Doc.Element("tr",[],a$2))],Doc.Element("table",[],a$1))];
  return Doc.Element("div",[],a);
 };
 Client.dlg=function()
 {
  SC$1.$cctor();
  return SC$1.dlg;
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
  SC$1.dlg=Dialog.get_Create();
  SC$1.$cctor=Global.ignore;
 });
}());
