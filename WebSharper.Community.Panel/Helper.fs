﻿namespace WebSharper.Community.Panel

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html

[<JavaScript>]
module Helper =
    let AttrsClick action =[Attr.Style "Color" "#FB8C00"
                            Attr.Style "cursor" "pointer"
                            on.click (fun elem _->action())]
    let Icon className id action = iAttr(Attr.Class className::AttrsClick action)[text id] :>Doc
    let IconNormal id action = Icon "material-icons orange600" id action
    let IconSmall id action = Icon "material-icons orange600 small" id action

    let TxtIcon className id txt action = divAttr(AttrsClick action)[
                                                iAttr[Attr.Class className][text id]
                                                text txt 
                                              ]:>Doc
    let TxtIconNormal id txt action = TxtIcon "material-icons orange600" id txt action

    let UniqueKey() = System.Guid.NewGuid().ToString()

