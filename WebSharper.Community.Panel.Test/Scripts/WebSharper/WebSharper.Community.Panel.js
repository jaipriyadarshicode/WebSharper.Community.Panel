(function()
{
 "use strict";
 var Global,WebSharper,Community,Panel,Panel$1,Rect,PanelItem,PanelContainer,IntelliFactory,Runtime,UI,Next,Var,Seq,List,AttrModule,Unchecked,Operators,View,Doc,Key,ListModel;
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
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 Var=Next&&Next.Var;
 Seq=WebSharper&&WebSharper.Seq;
 List=WebSharper&&WebSharper.List;
 AttrModule=Next&&Next.AttrModule;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 Operators=WebSharper&&WebSharper.Operators;
 View=Next&&Next.View;
 Doc=Next&&Next.Doc;
 Key=Next&&Next.Key;
 ListModel=Next&&Next.ListModel;
 Panel$1=Panel.Panel=Runtime.Class({
  get_panelAttr:function()
  {
   var $this,dragActive,mouseOverVar,leftOffset,topOffset,titleAttrsUpdated,panelAttrsUpdated,a,a$1,resDiv,a$2,a$3,a$4,a$5;
   $this=this;
   dragActive=Var.Create$1(false);
   mouseOverVar=Var.Create$1(false);
   leftOffset=Var.Create$1(0);
   topOffset=Var.Create$1(0);
   titleAttrsUpdated=Seq.concat([this.titleAttrs,List.ofArray([AttrModule.Style("cursor","grab"),AttrModule.Handler("mouseenter",function()
   {
    return function()
    {
     return Var.Set(mouseOverVar,true);
    };
   }),AttrModule.Handler("mouseleave",function()
   {
    return function()
    {
     return!dragActive.c?Var.Set(mouseOverVar,false):null;
    };
   }),AttrModule.Handler("mouseup",function()
   {
    return function()
    {
     Var.Set(mouseOverVar,false);
     return Var.Set(dragActive,false);
    };
   }),AttrModule.Handler("mousedown",function()
   {
    return function(evnt)
    {
     var a$6,a$7;
     mouseOverVar.c?Var.Set(dragActive,true):void 0;
     a$6=+evnt.clientX-$this.left.c;
     Var.Set(leftOffset,a$6);
     a$7=+evnt.clientY-$this.top.c;
     return Var.Set(topOffset,a$7);
    };
   }),AttrModule.Handler("mousemove",function()
   {
    return function(evnt)
    {
     var a$6,c,c$1,x_cor,y_cor,domRectParent,domRectParentParent,maxX,maxY,xPos,yPos,a$7,a$8;
     a$6="on.mouseMove:"+(c=evnt.button,Global.String(c))+" "+(c$1=evnt.clientX,Global.String(c$1));
     Global.console.log(a$6);
     return((dragActive.c?!Unchecked.Equals($this.element.c.parentElement,null):false)?!Unchecked.Equals($this.element.c.parentElement.parentElement,null):false)?(x_cor=evnt.clientX,(y_cor=evnt.clientY,(domRectParent=$this.element.c.getBoundingClientRect(),(domRectParentParent=$this.element.c.parentElement.getBoundingClientRect(),(maxX=domRectParentParent.width-domRectParent.width,(maxY=domRectParentParent.height-domRectParent.height,(xPos=Operators.Min(maxX,Operators.Max(0,+x_cor-leftOffset.c)),(yPos=Operators.Min(maxY,Operators.Max(0,+y_cor-topOffset.c)),(a$7=$this.left,Var.Set(a$7,xPos),a$8=$this.top,Var.Set(a$8,yPos),$this.arrangePanels($this)))))))))):null;
    };
   })])]);
   panelAttrsUpdated=Seq.concat([this.pannelAttrs,List.ofArray([AttrModule.Style("position","absolute"),AttrModule.DynamicStyle("left",(a=this.left.v,View.Map(function(x)
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
    }(Global.id))(x);
   },a))),AttrModule.DynamicStyle("top",(a$1=this.top.v,View.Map(function(y)
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
   resDiv=(a$2=[(a$3=this.titleContent,Doc.Element("div",titleAttrsUpdated,a$3)),this.content],Doc.Element("div",panelAttrsUpdated,a$2));
   a$4=this.element;
   a$5=resDiv.elt;
   Var.Set(a$4,a$5);
   return resDiv;
  }
 },null,Panel$1);
 Panel$1.Create=function(arrangePanels,pannelAttrs,titleAttrs,titleContent,content)
 {
  return Panel$1.New(Var.Create$1(0),Var.Create$1(0),Var.Create$1(Doc.Element("div",[],[]).elt),arrangePanels,pannelAttrs,titleAttrs,titleContent,content);
 };
 Panel$1.New=function(left,top,element,arrangePanels,pannelAttrs,titleAttrs,titleContent,content)
 {
  return new Panel$1({
   left:left,
   top:top,
   element:element,
   arrangePanels:arrangePanels,
   pannelAttrs:pannelAttrs,
   titleAttrs:titleAttrs,
   titleContent:titleContent,
   content:content
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
  return Rect.fromDomRect(panel.element.c).offset(panel.left.c,panel.top.c);
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
 PanelItem.Create=function(name,arrangePanels,panelAttrs,titleAttrs,titleContent,content)
 {
  return PanelItem.New(Key.Fresh(),name,Panel$1.Create(arrangePanels,panelAttrs,titleAttrs,titleContent,content));
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
   var $this,_this;
   $this=this;
   _this=haItem.Panel.get_panelAttr();
   return _this.OnAfterRender(function()
   {
    $this.MovePanelToFreeSpace(haItem);
   });
  },
  CreateItem:function(name,panelAttrs,titleAttrs,titleContent,content)
  {
   var $this;
   $this=this;
   this.PanelItems.Append(PanelItem.Create(name,function(a)
   {
    $this.ArrangePanels(a);
   },panelAttrs,titleAttrs,titleContent,content));
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
   (foundCandidate!=null?foundCandidate.$==1:false)?(rc=foundCandidate.$0,a=panelItem.Panel.left,a$1=rc.left+5,Var.Set(a,a$1),a$2=panelItem.Panel.top,a$3=rc.top+5,Var.Set(a$2,a$3)):void 0;
  },
  ArrangePanels:function(exceptPanel)
  {
   var listOfPanelItems,exceptPanelItem,p,foundPanel,p$1;
   listOfPanelItems=List.ofSeq(this.PanelItems);
   exceptPanelItem=(p=function(panelItem)
   {
    return panelItem.Panel.left.c===exceptPanel.left.c?panelItem.Panel.top.c===exceptPanel.top.c:false;
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
    rcPanel=Rect.fromDomRect(panel.Panel.element.c).offset(panel.Panel.left.c,panel.Panel.top.c).inflate(5,5);
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
  },
  FindPanelItemFromChildElement:function(elem)
  {
   var p;
   p=function(item)
   {
    while(true)
     if(Unchecked.Equals(elem,item.Panel.element.c))
      return true;
     else
      if(Unchecked.Equals(elem,null))
       return false;
      else
       elem=elem.parentElement;
   };
   return function(l)
   {
    return Seq.tryFind(p,l);
   }(List.ofSeq(this.PanelItems));
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
