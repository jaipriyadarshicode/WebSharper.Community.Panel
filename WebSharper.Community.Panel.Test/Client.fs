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
    let isExpanded = Var.Create false
    let transTime = 300.0
    let trans = Anim.Simple Interpolation.Double Easing.CubicInOut transTime
    let TransTransition = 
          Trans.Create trans
          |> Trans.Enter (fun _ -> trans 0.0 0.0)
          |> Trans.Exit (fun _ -> trans 0.0 0.0)
    let Main () =
      div[
       divAttr[Attr.DynamicStyle "pointer-events" (View.Map (fun _ -> if dlg.Visibility.Value then "none" else "auto") dlg.Visibility.View)
               Attr.DynamicStyle "opacity" (View.Map(fun _ -> if dlg.Visibility.Value then "0.5" else "1" ) dlg.Visibility.View)
              ]
         [
            table[
                tr[
                    tdAttr [Attr.Style "vertical-align" "top"]
                      [
                        tableAttr[Attr.AnimatedStyle "width" TransTransition (View.Map(fun isExpand -> if isExpanded.Value then 100.0 else 0.0) isExpanded.View) (fun x -> (string x) + "px")]
                             [
                                tr[td[Helper.IconNormal "dehaze" (fun _ -> if not isExpanded.Value then isExpanded.Value <- true else isExpanded.Value <- false) ]]
                                tr[
                                    td[Helper.IconNormal "announcement" (fun _ -> dlg.ShowDialog "Dialog title" (div[text "Content"]) (fun () -> ()))]
                                    tdAttr[Attr.DynamicStyle "display" (View.Map (fun value -> if not value then "none" else "block") isExpanded.View)
                                           Attr.Style "color" "White"
                                          ][text "Dialog"]

                                  ]
                                tr[td[Helper.IconNormal "add"
                                                           (fun _->let z_index=(panelContainer.PanelItems |>List.ofSeq).Length + 1
                                                                   let childPanelContainer = PanelContainer.Create
                                                                                                           .WithLayoutManager(LayoutManagers.StackPanelLayoutManager)
                                                                   let contentItems=ContentModel.Create
                                                                   let childPanel=Panel.Create
                                                                                       //.WithTitle(false)
                                                                                       .WithPannelAttrs([Attr.Class "panelContent"])
                                                                                       .WithPanelContent(contentItems.Render)
                                                                                       .WithWidth(150.0)
                                                                                       .WithHeight(150.0)
                                                                   childPanel.IsWithTitle.Value <- false
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
                                                                   )]
                                      
                                   tdAttr[Attr.DynamicStyle "display" (View.Map (fun value -> if not value then "none" else "block") isExpanded.View)
                                          Attr.Style "color" "White"
                                          ][text "Add Panel"]
                                    ]
                             ]
                        table[
                            tr[td[propertyGrid.Render]]
                         ]
                      ]
                    td[panelContainer.Render]
                  ]
            ]
        ]
       div[
          table[
             tr[td[dlg.Render]]
           ]
        ]
      ]
