(function()
{
 "use strict";
 var Global,WebSharper,Community,Panel,Test,Client,ContentItem,ContentModel,SC$1,IntelliFactory,Runtime,UI,Next,Doc,List,ListModel,AttrModule,View,Helper,Var,PanelContainer,LayoutManagers,Panel$1,TitleButton,PropertyGrid,Properties,PropertyGrid$1,Dialog;
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
 View=Next&&Next.View;
 Helper=Panel&&Panel.Helper;
 Var=Next&&Next.Var;
 PanelContainer=Panel&&Panel.PanelContainer;
 LayoutManagers=Panel&&Panel.LayoutManagers;
 Panel$1=Panel&&Panel.Panel;
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
  var a,a$1,a$2,a$3,a$4,a$5,a$6,a$7,a$8,a$9,a$10,a$11,a$12,a$13,a$14,a$15,a$16,a$17,a$18,a$19,a$20,a$21,a$22,a$23,a$24,a$25,a$26,a$27,a$28,a$29,a$30;
  a=[(a$1=[AttrModule.DynamicStyle("pointer-events",(a$2=Client.dlg().Visibility.v,View.Map(function()
  {
   return Client.dlg().Visibility.c?"none":"auto";
  },a$2))),AttrModule.DynamicStyle("opacity",(a$3=Client.dlg().Visibility.v,View.Map(function()
  {
   return Client.dlg().Visibility.c?"0.5":"1";
  },a$3)))],(a$4=[(a$5=[(a$6=[(a$7=[AttrModule.Style("vertical-align","top"),AttrModule.DynamicStyle("Width",(a$8=Client.isExpanded().v,View.Map(function(isExpanded)
  {
   return isExpanded?"100px":"0px";
  },a$8)))],(a$9=[(a$10=[(a$11=[(a$12=[Helper.IconNormal("dehaze",function()
  {
   var a$31,a$32;
   if(!Client.isExpanded().c)
    {
     a$31=Client.isExpanded();
     Var.Set(a$31,true);
    }
   else
    {
     a$32=Client.isExpanded();
     Var.Set(a$32,false);
    }
  })],Doc.Element("td",[],a$12))],Doc.Element("tr",[],a$11)),(a$13=[(a$14=[Helper.IconNormal("announcement",function()
  {
   var a$31,a$32;
   a$31=(a$32=[Doc.TextNode("Content")],Doc.Element("div",[],a$32));
   Client.dlg().ShowDialog("Dialog title",a$31,function()
   {
   });
  })],Doc.Element("td",[],a$14)),(a$15=[AttrModule.DynamicStyle("display",(a$16=Client.isExpanded().v,View.Map(function()
  {
   return!Client.isExpanded().c?"none":"block";
  },a$16))),AttrModule.Style("color","White"),AttrModule.Style("margin-left","15px"),AttrModule.Style("Width","75px")],(a$17=[Doc.TextNode("Dialog")],Doc.Element("td",a$15,a$17)))],Doc.Element("tr",[],a$13)),(a$18=[(a$19=[Helper.IconNormal("add",function()
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
    panel$1.EditProperties(Client.propertyGrid());
   }),TitleButton.New("clear",function(panel$1)
   {
    Client.panelContainer().PanelItems.Remove(Client.panelContainer().FindPanelItem(panel$1));
   })])).WithChildPanelContainer(childPanelContainer).WithWidth(150).WithProperties(List.ofArray([Properties.string("title1",titleVar)]));
   Client.panelContainer().AddPanel(panel);
  })],Doc.Element("td",[],a$19)),(a$20=[AttrModule.DynamicStyle("display",(a$21=Client.isExpanded().v,View.Map(function()
  {
   return!Client.isExpanded().c?"none":"block";
  },a$21))),AttrModule.Style("color","White"),AttrModule.Style("margin-left","15px"),AttrModule.Style("Width","75px")],(a$22=[Doc.TextNode("Add Panel")],Doc.Element("td",a$20,a$22)))],Doc.Element("tr",[],a$18))],Doc.Element("table",[],a$10)),(a$23=[(a$24=[(a$25=[Client.propertyGrid().get_Render()],Doc.Element("td",[],a$25))],Doc.Element("tr",[],a$24))],Doc.Element("table",[],a$23))],Doc.Element("td",a$7,a$9))),(a$26=[Client.panelContainer().get_Render()],Doc.Element("td",[],a$26))],Doc.Element("tr",[],a$6))],Doc.Element("table",[],a$5))],Doc.Element("div",a$1,a$4))),(a$27=[(a$28=[(a$29=[(a$30=[Client.dlg().get_Render()],Doc.Element("td",[],a$30))],Doc.Element("tr",[],a$29))],Doc.Element("table",[],a$28))],Doc.Element("div",[],a$27))];
  return Doc.Element("div",[],a);
 };
 Client.isExpanded=function()
 {
  SC$1.$cctor();
  return SC$1.isExpanded;
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
  SC$1.isExpanded=Var.Create$1(false);
  SC$1.$cctor=Global.ignore;
 });
}());
