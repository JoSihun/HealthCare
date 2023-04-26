package com.shyd.healthcare.domain.management;

import com.shyd.healthcare.domain.BaseTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DietSubCategory extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 100, nullable = false)
    private String categoryName;

    @OneToMany(mappedBy = "subCategory", cascade = CascadeType.PERSIST)
    private List<Diet> diets;
    @ManyToOne(fetch = FetchType.LAZY)
    private DietMainCategory mainCategory;

}
