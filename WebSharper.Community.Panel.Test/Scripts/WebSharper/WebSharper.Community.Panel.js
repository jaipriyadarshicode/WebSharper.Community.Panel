(function()
{
 "use strict";
 var Global,WebSharper,Community,Panel,TitleButton,Panel$1,Rect,PanelContainer,IntelliFactory,Runtime,UI,Next,AttrModule,Doc,Var,Input,Mouse,View,Operators,Seq,List,Unchecked,Key,ListModel;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Panel=Community.Panel=Community.Panel||{};
 TitleButton=Panel.TitleButton=Panel.TitleButton||{};
 Panel$1=Panel.Panel=Panel.Panel||{};
 Rect=Panel.Rect=Panel.Rect||{};
 PanelContainer=Panel.PanelContainer=Panel.PanelContainer||{};
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 AttrModule=Next&&Next.AttrModule;
 Doc=Next&&Next.Doc;
 Var=Next&&Next.Var;
 Input=Next&&Next.Input;
 Mouse=Input&&Input.Mouse;
 View=Next&&Next.View;
 Operators=WebSharper&&WebSharper.Operators;
 Seq=WebSharper&&WebSharper.Seq;
 List=WebSharper&&WebSharper.List;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 Key=Next&&Next.Key;
 ListModel=Next&&Next.ListModel;
 TitleButton=Panel.TitleButton=Runtime.Class({
  Render:function(panel)
  {
   var $this,a,a$1;
   $this=this;
   a=[AttrModule.Class("material-icons orange600 small"),AttrModule.Style("cursor","pointer"),AttrModule.Handler("click",function()
   {
    return function()
    {
     return $this.Action(panel);
    };
   })];
   a$1=[Doc.TextNode(this.Icon)];
   return Doc.Element("i",a,a$1);
  }
 },null,TitleButton);
 TitleButton.New=function(Icon,Action)
 {
  return new TitleButton({
   Icon:Icon,
   Action:Action
  });
 };
 Panel$1=Panel.Panel=Runtime.Class({
  get_Render:function()
  {
   var $this,dragActive,mouseOverVar,leftOffset,topOffset,mapDragActive,a,lastHeldPos,a$1,toLocal,f,titleAttrsUpdated,titleContentUpdated,a$2,a$3,a$4,a$5,a$6,a$7,m,panelAttrsUpdated,a$8,a$9,a$10,a$11,resDiv,a$12,a$13,a$14;
   $this=this;
   dragActive=Var.Create$1(false);
   mouseOverVar=Var.Create$1(false);
   leftOffset=Var.Create$1(0);
   topOffset=Var.Create$1(0);
   mapDragActive=(a=Mouse.get_LeftPressed(),View.Map(function(v)
   {
    return v?dragActive.c:false;
   },a));
   lastHeldPos=(a$1=Mouse.get_Position(),View.UpdateWhile([0,0],mapDragActive,a$1));
   toLocal=(f=function(x_cor,y_cor)
   {
    var domRectParent,domRectParentParent,maxX,maxY,xPos,yPos,a$15,a$16,a$17,c;
    return dragActive.c?(domRectParent=$this.Element.c.getBoundingClientRect(),(domRectParentParent=$this.Element.c.parentElement.getBoundingClientRect(),(maxX=domRectParentParent.width-domRectParent.width,(maxY=domRectParentParent.height-domRectParent.height,(xPos=Operators.Min(maxX,Operators.Max(0,+x_cor-leftOffset.c)),(yPos=Operators.Min(maxY,Operators.Max(0,+y_cor-topOffset.c)),(a$15=$this.Left,Var.Set(a$15,xPos),a$16=$this.Top,Var.Set(a$16,yPos),a$17="Last left:"+(c=$this.Left.c,Global.String(c)),Global.console.log(a$17),$this.ArrangePanels($this),[xPos,yPos]))))))):[$this.Left.c,$this.Top.c];
   },View.Map(function($1)
   {
    return f($1[0],$1[1]);
   },lastHeldPos));
   titleAttrsUpdated=Seq.concat([this.TitleAttrs,List.ofArray([AttrModule.Style("cursor","grab"),AttrModule.Handler("mouseenter",function()
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
     var a$15,a$16;
     ((mouseOverVar.c?!Unchecked.Equals($this.Element.c.parentElement,null):false)?!Unchecked.Equals($this.Element.c.parentElement.parentElement,null):false)?Var.Set(dragActive,true):void 0;
     a$15=+evnt.clientX-$this.Left.c;
     Var.Set(leftOffset,a$15);
     a$16=+evnt.clientY-$this.Top.c;
     return Var.Set(topOffset,a$16);
    };
   })])]);
   titleContentUpdated=(a$2=[AttrModule.Style("width","100%")],(a$3=[(a$4=[(a$5=[this.TitleContent],Doc.Element("td",[],a$5)),(a$6=[AttrModule.Style("text-align","right"),AttrModule.Style("vertical-align","middle")],(a$7=(m=function(btn)
   {
    return btn.Render($this);
   },function(l)
   {
    return List.map(m,l);
   }(this.TitleButtons)),Doc.Element("td",a$6,a$7)))],Doc.Element("tr",[],a$4))],Doc.Element("table",a$2,a$3)));
   panelAttrsUpdated=Seq.concat([this.PannelAttrs,List.ofArray([AttrModule.Style("position","absolute"),AttrModule.DynamicStyle("left",(a$8=this.Left.v,View.Map(function(x)
   {
    var f$1;
    f$1=function($1,$2)
    {
     return $1($2.toFixed(6)+"px");
    };
    return(function($1)
    {
     return function($2)
     {
      return f$1($1,$2);
     };
    }(Global.id))(x);
   },a$8))),AttrModule.DynamicStyle("left",(a$9=function(x)
   {
    var f$1;
    f$1=function($1,$2)
    {
     return $1($2.toFixed(6)+"px");
    };
    return(function($1)
    {
     return function($2)
     {
      return f$1($1,$2);
     };
    }(Global.id))(x);
   },View.Map(function($1)
   {
    return a$9($1[0],$1[1]);
   },toLocal))),AttrModule.DynamicStyle("top",(a$10=function(x,y)
   {
    var f$1;
    f$1=function($1,$2)
    {
     return $1($2.toFixed(6)+"px");
    };
    return(function($1)
    {
     return function($2)
     {
      return f$1($1,$2);
     };
    }(Global.id))(y);
   },View.Map(function($1)
   {
    return a$10($1[0],$1[1]);
   },toLocal))),AttrModule.DynamicStyle("top",(a$11=this.Top.v,View.Map(function(y)
   {
    var f$1;
    f$1=function($1,$2)
    {
     return $1($2.toFixed(6)+"px");
    };
    return(function($1)
    {
     return function($2)
     {
      return f$1($1,$2);
     };
    }(Global.id))(y);
   },a$11)))])]);
   resDiv=(a$12=[Doc.Element("div",titleAttrsUpdated,[titleContentUpdated]),this.PanelContent],Doc.Element("div",panelAttrsUpdated,a$12));
   a$13=this.Element;
   a$14=resDiv.elt;
   Var.Set(a$13,a$14);
   return resDiv;
  },
  WithArrangePanelsFnc:function(fnc)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Element,fnc,this.PannelAttrs,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent);
  },
  WithPanelContent:function(content)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Element,this.ArrangePanels,this.PannelAttrs,this.TitleAttrs,this.TitleContent,this.TitleButtons,content);
  },
  WithTitleButtons:function(buttons)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Element,this.ArrangePanels,this.PannelAttrs,this.TitleAttrs,this.TitleContent,buttons,this.PanelContent);
  },
  WithTitleContent:function(content)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Element,this.ArrangePanels,this.PannelAttrs,this.TitleAttrs,content,this.TitleButtons,this.PanelContent);
  },
  WithTitleAttrs:function(attrs)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Element,this.ArrangePanels,this.PannelAttrs,attrs,this.TitleContent,this.TitleButtons,this.PanelContent);
  },
  WithPannelAttrs:function(attrs)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Element,this.ArrangePanels,attrs,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent);
  }
 },null,Panel$1);
 Panel$1.get_Create=function()
 {
  return Panel$1.New(Key.Fresh(),Var.Create$1(0),Var.Create$1(0),Var.Create$1(null),function()
  {
  },new List.T({
   $:0
  }),List.ofArray([AttrModule.Class("panelTitle")]),Doc.Element("div",[],[]),new List.T({
   $:0
  }),Doc.Element("div",[],[]));
 };
 Panel$1.New=function(Key$1,Left,Top,Element,ArrangePanels,PannelAttrs,TitleAttrs,TitleContent,TitleButtons,PanelContent)
 {
  return new Panel$1({
   Key:Key$1,
   Left:Left,
   Top:Top,
   Element:Element,
   ArrangePanels:ArrangePanels,
   PannelAttrs:PannelAttrs,
   TitleAttrs:TitleAttrs,
   TitleContent:TitleContent,
   TitleButtons:TitleButtons,
   PanelContent:PanelContent
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
  return Rect.fromDomRect(panel.Element.c).offset(panel.Left.c,panel.Top.c);
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
 PanelContainer=Panel.PanelContainer=Runtime.Class({
  RenderPanelItem:function(haItem)
  {
   var $this,_this;
   $this=this;
   _this=haItem.get_Render();
   return _this.OnAfterRender(function()
   {
    $this.MovePanelToFreeSpace(haItem);
   });
  },
  AddPanel:function(panel)
  {
   var $this;
   $this=this;
   this.PanelItems.Append(panel.WithArrangePanelsFnc(function(a)
   {
    $this.ArrangePanels(a);
   }));
  },
  MovePanelToFreeSpace:function(panelItem)
  {
   var rcPanel,rcContainer,foundCandidate,p,rc,a,a$1,a$2,a$3;
   rcPanel=Rect.fromPanel(panelItem);
   rcContainer=Rect.fromDomRect(panelItem.Element.c.parentElement);
   foundCandidate=(p=function(rc$1)
   {
    Global.console.log("Finds free rect: "+Global.String(rc$1));
    return rc$1.get_width()>=rcPanel.get_width()?rc$1.get_height()>=rcPanel.get_height():false;
   },function(l)
   {
    return Seq.tryFind(p,l);
   }(this.CollectFreeSpace(rcContainer,panelItem)));
   (foundCandidate!=null?foundCandidate.$==1:false)?(rc=foundCandidate.$0,a=panelItem.Left,a$1=rc.left+5,Var.Set(a,a$1),a$2=panelItem.Top,a$3=rc.top+5,Var.Set(a$2,a$3)):void 0;
  },
  ArrangePanels:function(exceptPanel)
  {
   var listOfPanelItems,exceptPanelItem,p,foundPanel,p$1;
   listOfPanelItems=List.ofSeq(this.PanelItems);
   exceptPanelItem=(p=function(panelItem)
   {
    return panelItem.Left.c===exceptPanel.Left.c?panelItem.Top.c===exceptPanel.Top.c:false;
   },function(l)
   {
    return Seq.find(p,l);
   }(listOfPanelItems));
   foundPanel=(p$1=function(panelItem)
   {
    return!Unchecked.Equals(panelItem.Key,exceptPanelItem.Key)?!Rect.fromPanel(panelItem).intersect(Rect.fromPanel(exceptPanelItem)).get_isEmpty():false;
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
    rcPanel=Rect.fromDomRect(panel.Element.c).offset(panel.Left.c,panel.Top.c).inflate(5,5);
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
  FindPanelItem:function(panel)
  {
   var p;
   p=function(item)
   {
    return Unchecked.Equals(item.Element,panel.Element);
   };
   return function(l)
   {
    return Seq.find(p,l);
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
