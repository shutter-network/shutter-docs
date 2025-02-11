export default {
  shutterSidebar: [
    {
      type: "category",
      label: "Shutter Network",
      collapsible: true,
      collapsed: false,
      className: "sidebar-item",
      items: [
        "shutter/index",
        "shutter/products",
        "shutter/integrations",
      ],
    },
    {
      type: "category",
      label: "Research",
      className: "sidebar-title",
      items: [
        "shutter/research/the_road_towards_an_encrypted_mempool_on_ethereum",
        "shutter/research/shutterized_beacon_chain",
        "shutter/research/viability_integrating_enc_mempool_op_stack",
        "shutter/research/decision_template_for_enc_mempool_ops",
        "shutter/research/transaction_ordering_in_amm",
      ],
    },
  ],

  daoSidebar: [
    {
      type: "category",
      label: "Shutter DAO",
      collapsible: true,
      collapsed: false,
      items: ["dao/index"],
    },
    {
      type: "category",
      label: "Shutter DAO 0x36",
      className: "sidebar-title",
      items: ["dao/0x36/index"],
    },
  ],

  protocolSidebar: [
    {
      type: "category",
      label: "Shutter Protocol",
      collapsible: true,
      collapsed: false,
      items: ["protocol/index", "protocol/overview"],
    },
  ],
};
