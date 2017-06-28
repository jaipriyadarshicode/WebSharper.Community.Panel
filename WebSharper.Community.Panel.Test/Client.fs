namespace WebSharper.Community.Panel.Test


open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Panel
open WebSharper.Community.PropertyGrid

[<JavaScript>]
module Client =

    let panelContainer=PanelContainer.Create
                                     .WithWidth(800.0).WithHeight(400.0)
                                     .WithLayoutManager(LayoutManagers.FloatingPanelLayoutManager 5.0)
                                     //.WithLayoutManager(LayoutManagers.StackPanelLayoutManager)
                                     .WithAttributes([Attr.Style "border" "1px solid white"])
    [<JavaScript>]
    type ContentItem=
        {
            Text:string
        }

    [<JavaScript>]
    type ContentModel=
        {
             Items : ListModel<string,ContentItem>
        }
        static member Create =
            {   
                Items=ListModel.Create (fun item ->item.Text) [{Text="Content 1"}]
            }
        member x.Render = 
               x.Items.View
              |> Doc.BindSeqCachedBy x.Items.Key (fun item-> div[text item.Text])
    let propertyGrid = PropertyGrid.Create
    let dlg = Dialog.Create
    let Main () =
        div [
            table[
                tr[
                    tdAttr [Attr.Style "vertical-align" "top"][
                        table
                             [
                                trAttr[Attr.Style "Height" "100%"]
                                  [
                                    tdAttr[Attr.Style "Height" "100%"]
                                          [iAttr[Attr.Class "material-icons orange600"][text "dehaze"]]
                                  ]
                                trAttr[Attr.Style "Height" "100%"]
                                  [
                                    tdAttr[Attr.Style "Height" "100%"]
                                          [iAttr[Attr.Class "material-icons orange600"
                                                 Attr.Style "cursor" "pointer"
                                                 on.mouseDown (fun _ _-> dlg.ShowDialog "Dialog title" (div[text "Content"]) (fun () -> ()))
                                                 ][text "announcement"]]
                                  ]
                                tr[td[iAttr[Attr.Class "material-icons orange600"
                                            Attr.Style "cursor" "pointer"
                                            on.mouseDown (fun _ _->let z_index=(panelContainer.PanelItems |>List.ofSeq).Length + 1
                                                                   let childPanelContainer = PanelContainer.Create
                                                                                                           .WithLayoutManager(LayoutManagers.StackPanelLayoutManager)
                                                                   let contentItems=ContentModel.Create
                                                                   let childPanel=Panel.Create
                                                                                       .WithTitle(false)
                                                                                       .WithPannelAttrs([Attr.Class "panelContent"])
                                                                                       .WithPanelContent(contentItems.Render)
                                                                                       .WithWidth(150.0)
                                                                                       .WithHeight(150.0)
                                                                   childPanelContainer.AddPanel childPanel
                                                                   let titleVar=Var.Create ("Panel "+z_index.ToString())
                                                                   let panel=Panel.Create
                                                                                  .WithPannelAttrs([Attr.Style "position" "absolute"])
                                                                                  .WithTitleContent(textView titleVar.View)
                                                                                  .WithTitleButtons(
                                                                                               [
                                                                                                 {Icon="add";Action=(fun panel-> let index = (contentItems.Items |>List.ofSeq).Length
                                                                                                                                 if index < 7 then
                                                                                                                                    let item = {Text = "Content "+ (index + 1).ToString()}
                                                                                                                                    contentItems.Items.Add item
                                                                                                                                 )}
                                                                                                 {Icon="edit";Action=(fun panel->panel.EditProperties propertyGrid)}
                                                                                                 {Icon="clear";Action=(fun panel->panelContainer.PanelItems.Remove(panelContainer.FindPanelItem panel))}
                                                                                               ])
                                                                                  //.WithPanelContent(divAttr[Attr.Class "panelContent"][text "Content"])
                                                                                  .WithChildPanelContainer(childPanelContainer)
                                                                                  .WithWidth(150.0)
                                                                                  .WithProperties([
                                                                                                    Properties.string "title1" titleVar
                                                                                                  ])
                                                                   panelContainer.AddPanel panel
                                                                   )][text "add"]
                                      ]
                                    ]
                                tr[td[ dlg.Render
                                       propertyGrid.Render]]
                             ]
                      ]
                    td[panelContainer.Render]
                  ]
            ]
        ]
