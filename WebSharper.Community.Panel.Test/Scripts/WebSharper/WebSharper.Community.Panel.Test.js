(function()
{
 "use strict";
 var Global,WebSharper,Community,Panel,Test,Client,ContentItem,ContentModel,SC$1,IntelliFactory,Runtime,UI,Next,Doc,ListModel,List,AttrModule,View,Helper,Var,PanelContainer,LayoutManagers,Panel$1,TitleButton,PropertyGrid,Properties,PropertyGrid$1,Dialog;
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
 ListModel=Next&&Next.ListModel;
 List=WebSharper&&WebSharper.List;
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
   return Doc.ConvertBy(this.Items.key,function(item)
   {
    return Doc.Element("div",[],[Doc.TextNode(item.Text)]);
   },this.Items.v);
  }
 },null,ContentModel);
 ContentModel.get_Create=function()
 {
  return ContentModel.New(ListModel.Create(function(item)
  {
   return item.Text;
  },List.ofArray([ContentItem.New("Content 1")])));
 };
 ContentModel.New=function(Items)
 {
  return new ContentModel({
   Items:Items
  });
 };
 Client.Main=function()
 {
  return Doc.Element("div",[],[Doc.Element("div",[AttrModule.DynamicStyle("pointer-events",View.Map(function()
  {
   return Client.dlg().Visibility.c?"none":"auto";
  },Client.dlg().Visibility.v)),AttrModule.DynamicStyle("opacity",View.Map(function()
  {
   return Client.dlg().Visibility.c?"0.5":"1";
  },Client.dlg().Visibility.v))],[Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[AttrModule.Style("vertical-align","top"),AttrModule.DynamicStyle("Width",View.Map(function(isExpanded)
  {
   return isExpanded?"100px":"0px";
  },Client.isExpanded().v))],[Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[],[Helper.IconNormal("dehaze",function()
  {
   if(!Client.isExpanded().c)
    Var.Set(Client.isExpanded(),true);
   else
    Var.Set(Client.isExpanded(),false);
  })])]),Doc.Element("tr",[],[Doc.Element("td",[],[Helper.IconNormal("announcement",function()
  {
   var a;
   a=Doc.Element("div",[],[Doc.TextNode("Content")]);
   Client.dlg().ShowDialog("Dialog title",a,Global.ignore);
  })]),Doc.Element("td",[AttrModule.DynamicStyle("display",View.Map(function()
  {
   return!Client.isExpanded().c?"none":"block";
  },Client.isExpanded().v)),AttrModule.Style("color","White"),AttrModule.Style("margin-left","15px"),AttrModule.Style("Width","75px")],[Doc.TextNode("Dialog")])]),Doc.Element("tr",[],[Doc.Element("td",[],[Helper.IconNormal("add",function()
  {
   var z_index,childPanelContainer,contentItems,titleVar,panel;
   z_index=List.ofSeq(Client.panelContainer().PanelItems).get_Length()+1;
   childPanelContainer=PanelContainer.get_Create().WithLayoutManager(LayoutManagers.StackPanelLayoutManager());
   contentItems=ContentModel.get_Create();
   childPanelContainer.AddPanel(Panel$1.get_Create().WithTitle(false).WithPannelAttrs([AttrModule.Class("panelContent")]).WithPanelContent(contentItems.get_Render()).WithWidth(150).WithHeight(150));
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
  })]),Doc.Element("td",[AttrModule.DynamicStyle("display",View.Map(function()
  {
   return!Client.isExpanded().c?"none":"block";
  },Client.isExpanded().v)),AttrModule.Style("color","White"),AttrModule.Style("margin-left","15px"),AttrModule.Style("Width","75px")],[Doc.TextNode("Add Panel")])])]),Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[],[Client.propertyGrid().get_Render()])])])]),Doc.Element("td",[],[Client.panelContainer().get_Render()])])])]),Doc.Element("div",[],[Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[],[Client.dlg().get_Render()])])])])]);
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
