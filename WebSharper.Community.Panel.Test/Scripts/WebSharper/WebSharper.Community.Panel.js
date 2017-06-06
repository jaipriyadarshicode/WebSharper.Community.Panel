(function()
{
 "use strict";
 var Global,WebSharper,Community,Panel,Panel$1,Rect,PanelItem,PanelContainer,IntelliFactory,Runtime,Seq,List,UI,Next,AttrModule,Var,Unchecked,Operators,View,Doc,Key,ListModel;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Panel=Community.Panel=Community.Panel||{};
 Panel$1=Panel.Panel=Panel.Panel||{};
 Rect=Panel.Rect=Panel.Rect||{};
 PanelItem=Panel.PanelItem=Panel.PanelItem||{};
 PanelContainer=Panel.PanelContainer=Panel.PanelContainer||{};
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 Seq=WebSharper&&WebSharper.Seq;
 List=WebSharper&&WebSharper.List;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 AttrModule=Next&&Next.AttrModule;
 Var=Next&&Next.Var;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 Operators=WebSharper&&WebSharper.Operators;
 View=Next&&Next.View;
 Doc=Next&&Next.Doc;
 Key=Next&&Next.Key;
 ListModel=Next&&Next.ListModel;
 Panel$1=Panel.Panel=Runtime.Class({
  panelAttr:function(pannelAttrs,titleAttrs,titleContent,childContent)
  {
   var $this,titleAttrsUpdated,panelAttrsUpdated,a,a$1,resDiv,a$2,a$3,a$4;
   $this=this;
   titleAttrsUpdated=Seq.concat([titleAttrs,List.ofArray([AttrModule.Style("cursor","grab"),AttrModule.Handler("mouseenter",function()
   {
    return function()
    {
     var a$5;
     a$5=$this.mouseOverVar;
     return Var.Set(a$5,true);
    };
   }),AttrModule.Handler("mouseleave",function()
   {
    return function()
    {
     var a$5;
     a$5=$this.mouseOverVar;
     return Var.Set(a$5,false);
    };
   }),AttrModule.Handler("mouseup",function()
   {
    return function()
    {
     var a$5;
     a$5=$this.mouseDownVar;
     return Var.Set(a$5,false);
    };
   }),AttrModule.Handler("mousedown",function()
   {
    return function(evnt)
    {
     var a$5,a$6,a$7,a$8,a$9;
     a$5=$this.mouseDownVar;
     Var.Set(a$5,true);
     a$6=$this.leftOffset;
     a$7=+evnt.clientX-$this.lastLeft.c;
     Var.Set(a$6,a$7);
     a$8=$this.topOffset;
     a$9=+evnt.clientY-$this.lastTop.c;
     return Var.Set(a$8,a$9);
    };
   }),AttrModule.Handler("mousemove",function()
   {
    return function(evnt)
    {
     var x_cor,y_cor,domRectParent,domRectParentParent,maxX,maxY,xPos,yPos,a$5,a$6;
     return((($this.mouseDownVar.c?$this.mouseOverVar.c:false)?!Unchecked.Equals($this.element.c.parentElement,null):false)?!Unchecked.Equals($this.element.c.parentElement.parentElement,null):false)?(x_cor=evnt.clientX,(y_cor=evnt.clientY,(domRectParent=$this.element.c.getBoundingClientRect(),(domRectParentParent=$this.element.c.parentElement.getBoundingClientRect(),(maxX=domRectParentParent.width-domRectParent.width,(maxY=domRectParentParent.height-domRectParent.height,(xPos=Operators.Min(maxX,Operators.Max(0,+x_cor-$this.leftOffset.c)),(yPos=Operators.Min(maxY,Operators.Max(0,+y_cor-$this.topOffset.c)),(a$5=$this.lastLeft,Var.Set(a$5,xPos),a$6=$this.lastTop,Var.Set(a$6,yPos),$this.arrangePanels($this)))))))))):null;
    };
   })])]);
   panelAttrsUpdated=Seq.concat([pannelAttrs,List.ofArray([AttrModule.Style("position","absolute"),AttrModule.DynamicStyle("left",(a=this.lastLeft.v,View.Map(function(x)
   {
    var f;
    Global.console.log("x from lastLeft");
    f=function($1,$2)
    {
     return $1($2.toFixed(6)+"px");
    };
    return(function($1)
    {
     return function($2)
     {
      return f($1,$2);
     };
    }(Global.id))(x);
   },a))),AttrModule.DynamicStyle("top",(a$1=this.lastTop.v,View.Map(function(y)
   {
    var f;
    f=function($1,$2)
    {
     return $1($2.toFixed(6)+"px");
    };
    return(function($1)
    {
     return function($2)
     {
      return f($1,$2);
     };
    }(Global.id))(y);
   },a$1)))])]);
   resDiv=(a$2=[Doc.Element("div",titleAttrsUpdated,titleContent),childContent],Doc.Element("div",panelAttrsUpdated,a$2));
   a$3=this.element;
   a$4=resDiv.elt;
   Var.Set(a$3,a$4);
   return resDiv;
  }
 },null,Panel$1);
 Panel$1.Create=function(arrangePanels)
 {
  return Panel$1.New(Var.Create$1(false),Var.Create$1(false),Var.Create$1(0),Var.Create$1(0),Var.Create$1(0),Var.Create$1(0),Var.Create$1(Doc.Element("div",[],[]).elt),arrangePanels);
 };
 Panel$1.New=function(mouseOverVar,mouseDownVar,leftOffset,topOffset,lastLeft,lastTop,element,arrangePanels)
 {
  return new Panel$1({
   mouseOverVar:mouseOverVar,
   mouseDownVar:mouseDownVar,
   leftOffset:leftOffset,
   topOffset:topOffset,
   lastLeft:lastLeft,
   lastTop:lastTop,
   element:element,
   arrangePanels:arrangePanels
  });
 };
 Rect=Panel.Rect=Runtime.Class({
  toString:function()
  {
   return"left:"+Global.String(this.left)+" "+" top:"+Global.String(this.top)+" right:"+Global.String(this.right)+" bottom:"+Global.String(this.bottom);
  },
  inflate:function(width,height)
  {
   var l,t;
   l=this.left-width;
   t=this.top-height;
   return Rect.New(l,this.right+width,t,this.bottom+height);
  },
  get_height:function()
  {
   return this.bottom-this.top;
  },
  get_width:function()
  {
   return this.right-this.left;
  },
  intersect:function(rect)
  {
   var left,right,top,bottom;
   left=Operators.Max(this.left,rect.left);
   right=Operators.Min(this.right,rect.right);
   top=Operators.Max(this.top,rect.top);
   bottom=Operators.Min(this.bottom,rect.bottom);
   return Rect.New(left,Operators.Max(left,right),top,Operators.Max(top,bottom));
  },
  offset:function(x_offset,y_offset)
  {
   var l,t;
   l=this.left+x_offset;
   t=this.top+y_offset;
   return Rect.New(l,this.right+x_offset,t,this.bottom+y_offset);
  },
  get_isEmpty:function()
  {
   return this.left>=this.right?true:this.top>=this.bottom;
  }
 },null,Rect);
 Rect.fromPanel=function(panel)
 {
  return Rect.fromDomRect(panel.element.c).offset(panel.lastLeft.c,panel.lastTop.c);
 };
 Rect.fromDomRect=function(elem)
 {
  var domRc;
  domRc=elem.getBoundingClientRect();
  return Rect.New(0,domRc.width,0,domRc.height);
 };
 Rect.New=function(left,right,top,bottom)
 {
  return new Rect({
   left:left,
   right:right,
   top:top,
   bottom:bottom
  });
 };
 PanelItem.Create=function(name,arrangePanels)
 {
  return PanelItem.New(Key.Fresh(),name,Panel$1.Create(arrangePanels));
 };
 PanelItem.New=function(Key$1,Name,Panel$2)
 {
  return{
   Key:Key$1,
   Name:Name,
   Panel:Panel$2
  };
 };
 PanelContainer=Panel.PanelContainer=Runtime.Class({
  RenderPanelItem:function(haItem)
  {
   var $this,_this,o,a,a$1,a$2,a$3,a$4,a$5,a$6,a$7,a$8,a$9,a$10,a$11,a$12;
   $this=this;
   _this=(o=haItem.Panel,(a=List.ofArray([AttrModule.Style("Width","150px")]),(a$1=List.ofArray([AttrModule.Class("panelTitle")]),(a$2=List.ofArray([(a$3=[AttrModule.Style("width","100%")],(a$4=[(a$5=[(a$6=[Doc.TextNode(haItem.Name)],Doc.Element("td",[],a$6)),(a$7=[AttrModule.Style("text-align","right"),AttrModule.Style("vertical-align","middle")],(a$8=[(a$9=[AttrModule.Class("material-icons orange600 small"),AttrModule.Style("cursor","pointer"),AttrModule.Handler("mousedown",function()
   {
    return function()
    {
     return $this.PanelItems.Remove(haItem);
    };
   })],(a$10=[Doc.TextNode("clear")],Doc.Element("i",a$9,a$10)))],Doc.Element("td",a$7,a$8)))],Doc.Element("tr",[],a$5))],Doc.Element("table",a$3,a$4)))]),o.panelAttr(a,a$1,a$2,(a$11=[AttrModule.Class("panelContent")],(a$12=[Doc.TextNode("Content")],Doc.Element("div",a$11,a$12))))))));
   return _this.OnAfterRender(function()
   {
    $this.MovePanelToFreeSpace(haItem);
   });
  },
  CreateItem:function(name)
  {
   var $this;
   $this=this;
   this.PanelItems.Append(PanelItem.Create(name,function(a)
   {
    $this.ArrangePanels(a);
   }));
  },
  MovePanelToFreeSpace:function(panelItem)
  {
   var rcPanel,rcContainer,foundCandidate,p,rc,a,a$1,a$2,a$3;
   rcPanel=Rect.fromPanel(panelItem.Panel);
   rcContainer=Rect.fromDomRect(panelItem.Panel.element.c.parentElement);
   foundCandidate=(p=function(rc$1)
   {
    Global.console.log("Finds free rect: "+Global.String(rc$1));
    return rc$1.get_width()>=rcPanel.get_width()?rc$1.get_height()>=rcPanel.get_height():false;
   },function(l)
   {
    return Seq.tryFind(p,l);
   }(this.CollectFreeSpace(rcContainer,panelItem)));
   (foundCandidate!=null?foundCandidate.$==1:false)?(rc=foundCandidate.$0,a=panelItem.Panel.lastLeft,a$1=rc.left+5,Var.Set(a,a$1),a$2=panelItem.Panel.lastTop,a$3=rc.top+5,Var.Set(a$2,a$3)):void 0;
  },
  ArrangePanels:function(exceptPanel)
  {
   var listOfPanelItems,exceptPanelItem,p,foundPanel,p$1;
   listOfPanelItems=List.ofSeq(this.PanelItems);
   exceptPanelItem=(p=function(panelItem)
   {
    return panelItem.Panel.lastLeft.c===exceptPanel.lastLeft.c?panelItem.Panel.lastTop.c===exceptPanel.lastTop.c:false;
   },function(l)
   {
    return Seq.find(p,l);
   }(listOfPanelItems));
   foundPanel=(p$1=function(panelItem)
   {
    return!Unchecked.Equals(panelItem.Key,exceptPanelItem.Key)?!Rect.fromPanel(panelItem.Panel).intersect(Rect.fromPanel(exceptPanelItem.Panel)).get_isEmpty():false;
   },function(l)
   {
    return Seq.tryFind(p$1,l);
   }(List.ofSeq(this.PanelItems)));
   (foundPanel!=null?foundPanel.$==1:false)?this.MovePanelToFreeSpace(foundPanel.$0):void 0;
  },
  CollectFreeSpace:function(rcContainer,except)
  {
   var x,p,s;
   x=(p=function(item)
   {
    return!Unchecked.Equals(item.Key,except.Key);
   },function(l)
   {
    return List.filter(p,l);
   }(List.ofSeq(this.PanelItems)));
   s=List.ofArray([rcContainer]);
   return Seq.fold(function(acc,panel)
   {
    var rcPanel,rcTop,rcLeft,m,t,b;
    rcPanel=Rect.fromDomRect(panel.Panel.element.c).offset(panel.Panel.lastLeft.c,panel.Panel.lastTop.c).inflate(5,5);
    Global.console.log("collectFreeSpace: "+Global.String(rcPanel));
    rcTop=Rect.New(0,rcContainer.right,0,rcPanel.top);
    rcLeft=Rect.New(0,rcPanel.left,rcPanel.top,rcPanel.bottom);
    return List.concat((m=function(rc)
    {
     var p$1,m$1;
     p$1=function(accRect)
     {
      Global.console.log("filter: "+Global.String(accRect));
      return!accRect.get_isEmpty();
     };
     return function(l)
     {
      return List.filter(p$1,l);
     }((m$1=function(accRc)
     {
      return accRc.intersect(rc);
     },function(l)
     {
      return List.map(m$1,l);
     }(acc)));
    },function(l)
    {
     return List.map(m,l);
    }(List.ofArray([rcTop,rcLeft,Rect.New(rcPanel.right,rcContainer.right,rcLeft.top,rcLeft.bottom),(t=rcPanel.bottom,(b=rcContainer.bottom,Rect.New(rcTop.left,rcTop.right,t,b)))]))));
   },s,x);
  }
 },null,PanelContainer);
 PanelContainer.get_Create=function()
 {
  var a;
  return PanelContainer.New((a=new List.T({
   $:0
  }),ListModel.Create(function(item)
  {
   return item.Key;
  },a)));
 };
 PanelContainer.New=function(PanelItems)
 {
  return new PanelContainer({
   PanelItems:PanelItems
  });
 };
}());
